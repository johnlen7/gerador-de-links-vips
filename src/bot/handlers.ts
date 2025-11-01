import type { Context } from 'grammy';
import { config } from '../config';
import { LinkGenerator } from '../utils/link-generator';
import { Messages } from './messages';
import { Logger } from '../utils/logger';
import type { MetricsService } from '../services/metrics-service';

export class CommandHandlers {
  constructor(
    private readonly linkGenerator: LinkGenerator,
    private readonly metricsService: MetricsService
  ) {}

  async handleStart(ctx: Context): Promise<void> {
    const userId = ctx.from?.id;
    const username = ctx.from?.username;

    Logger.info(`User started the bot`, { userId, username });

    await ctx.reply(Messages.welcome(), { parse_mode: 'Markdown' });
  }

  async handleGenerate(ctx: Context): Promise<void> {
    const userId = ctx.from?.id ?? 0;
    const username = ctx.from?.username;
    const startTime = Date.now();

    Logger.info(`User requested link generation`, { userId, username });

    try {
      if (!ctx.chat) {
        Logger.warn('Command executed without chat context', { userId });
        return;
      }

      const processingMsg = await ctx.reply(Messages.processingLinks(), {
        parse_mode: 'Markdown',
      });

      const { links: generatedLinks, permissionMissing } =
        await this.linkGenerator.generateLinks(config.vipGroupIds);

      // Try to delete processing message, but don't fail if it errors
      try {
        await ctx.api.deleteMessage(ctx.chat.id, processingMsg.message_id);
      } catch (error) {
        Logger.debug('Failed to delete processing message', { error });
      }

      const duration = Date.now() - startTime;
      const failedLinks = generatedLinks.filter((link) => link.link.includes('Failed'));
      const successCount = generatedLinks.length - failedLinks.length;

      // Record metrics
      this.metricsService.recordLinkGeneration(
        userId,
        successCount,
        duration,
        failedLinks.length > 0
      );

      if (failedLinks.length > 0) {
        if (permissionMissing) {
          await ctx.reply(Messages.missingPermissions(), { parse_mode: 'Markdown' });
          Logger.error(`Permission error while generating links`, { userId, username });
        } else {
          await ctx.reply(Messages.error(), { parse_mode: 'Markdown' });
          Logger.error(`No links generated successfully`, { userId, username });
        }
        return;
      }

      await ctx.reply(Messages.accessGranted(generatedLinks), {
        parse_mode: 'Markdown',
        link_preview_options: { is_disabled: true },
      });

      Logger.success(`Successfully generated links`, {
        userId,
        username,
        linkCount: generatedLinks.length,
        duration,
      });

      // Log performance metric
      Logger.metric('link_generation_time', duration, { userId, linkCount: successCount });
    } catch (error) {
      const duration = Date.now() - startTime;
      this.metricsService.recordLinkGeneration(userId, 0, duration, true);

      Logger.error('Error in handleGenerate', error, { userId, username });
      await ctx.reply(Messages.error(), { parse_mode: 'Markdown' });
    }
  }

  async handleHelp(ctx: Context): Promise<void> {
    const helpText = `🤖 **VIP Link Generator Bot - Help**

**Available Commands:**
/start - Start the bot and see welcome message
/generate - Generate exclusive VIP group invite links
/help - Show this help message
/stats - View bot statistics (admin only)

**Features:**
✅ Generate temporary invite links (1 hour expiry)
✅ Single-use links (1 person only)
✅ Access to ${config.vipGroupIds.length} exclusive VIP groups
✅ Parallel link generation for speed
✅ Automatic retry on transient errors

**Important Notes:**
• All links expire after 1 hour
• Each link can only be used once
• Bot is restricted to authorized users only
• Rate limited to 10 requests per 30 seconds
• Bot only responds in private chat (not in groups)

Need assistance? Contact the administrator.`;

    await ctx.reply(helpText, { parse_mode: 'Markdown' });
  }

  async handleStats(ctx: Context): Promise<void> {
    const userId = ctx.from?.id;

    // Only first authorized user (admin) can see stats
    if (userId !== config.authorizedUserIds[0]) {
      await ctx.reply('⛔ **Access Denied**\n\nThis command is restricted to administrators only.', {
        parse_mode: 'Markdown',
      });
      return;
    }

    const stats = this.metricsService.getStats();
    const topUsers = this.metricsService.getTopUsers(5);

    const successRate =
      stats.totalRequests > 0
        ? ((stats.successfulGenerations / stats.totalRequests) * 100).toFixed(1)
        : '0.0';

    const uptimeHours = Math.floor(stats.uptime / 3600);
    const uptimeMinutes = Math.floor((stats.uptime % 3600) / 60);

    const statsMessage = `📊 **Bot Statistics**

**Overall Performance:**
• Total Requests: ${stats.totalRequests}
• Successful Generations: ${stats.successfulGenerations}
• Failed Generations: ${stats.failedGenerations}
• Success Rate: ${successRate}%
• Total Links Generated: ${stats.totalLinksGenerated}
• Avg Response Time: ${Math.round(stats.averageResponseTime)}ms

**System:**
• Uptime: ${uptimeHours}h ${uptimeMinutes}m
• VIP Groups: ${config.vipGroupIds.length}
• Authorized Users: ${config.authorizedUserIds.length}

**Top Users:**
${topUsers.map((u, i) => `${i + 1}. User ${u.userId}: ${u.requests} requests`).join('\n') || 'No data yet'}

**Last Reset:** ${stats.lastReset.toLocaleString()}`;

    await ctx.reply(statsMessage, { parse_mode: 'Markdown' });

    Logger.info('Admin viewed statistics', { userId, stats });
  }
}

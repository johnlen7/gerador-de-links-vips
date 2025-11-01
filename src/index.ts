import { Bot } from 'grammy';
import { limit } from '@grammyjs/ratelimiter';
import { config } from './config';
import { authMiddleware } from './bot/middleware';
import { CommandHandlers } from './bot/handlers';
import { LinkGenerator } from './utils/link-generator';
import { Logger } from './utils/logger';
import { MetricsService } from './services/metrics-service';
import { startHealthCheckServer } from './services/health-check';

async function main(): Promise<void> {
  try {
    Logger.info('🚀 Starting VIP Link Generator Bot...');

    const bot = new Bot(config.botToken);
    const metricsService = new MetricsService();

    const botInfo = await bot.api.getMe();
    Logger.success(`Bot initialized: @${botInfo.username}`, { botId: botInfo.id });

    // Start health check server
    const healthPort = parseInt(process.env.PORT || '3000', 10);
    startHealthCheckServer(bot, metricsService, healthPort);

    const linkGenerator = new LinkGenerator(bot);
    const handlers = new CommandHandlers(linkGenerator, metricsService);

    if (config.nodeEnv === 'development') {
      await linkGenerator.testBotPermissions(config.vipGroupIds);
    }

    // Apply rate limiting BEFORE auth middleware
    bot.use(
      limit({
        timeFrame: 30000, // 30 seconds
        limit: 10, // Max 10 commands per 30 seconds
        onLimitExceeded: async (ctx) => {
          Logger.warn('Rate limit exceeded', {
            userId: ctx.from?.id,
            username: ctx.from?.username,
          });
          await ctx.reply(
            '⏳ **Rate Limit Exceeded**\n\nYou can only use commands 10 times per 30 seconds. Please wait before trying again.',
            { parse_mode: 'Markdown' }
          );
        },
        keyGenerator: (ctx) => {
          return ctx.from?.id?.toString() ?? 'anonymous';
        },
      })
    );

    // Then apply auth middleware
    bot.use(authMiddleware);

    // Register commands
    bot.command('start', (ctx) => handlers.handleStart(ctx));
    bot.command('generate', (ctx) => handlers.handleGenerate(ctx));
    bot.command('help', (ctx) => handlers.handleHelp(ctx));
    bot.command('stats', (ctx) => handlers.handleStats(ctx));

    // Handle unknown commands
    bot.on('message', async (ctx) => {
      if (ctx.message?.text?.startsWith('/')) {
        await ctx.reply('❓ Unknown command. Use /help to see available commands.', {
          parse_mode: 'Markdown',
        });
      }
    });

    // Global error handler
    bot.catch((err) => {
      const ctx = err.ctx;
      Logger.error('Bot error occurred', err.error, {
        updateType: ctx.update.update_id,
        userId: ctx.from?.id,
      });
    });

    Logger.info('🎯 Bot is starting...');
    await bot.start({
      onStart: (info) => {
        Logger.success(`✅ Bot @${info.username} is running!`, { botId: info.id });
        Logger.info(`📊 Monitoring ${config.vipGroupIds.length} VIP groups`);
        Logger.info(`👥 ${config.authorizedUserIds.length} authorized users`);
        Logger.info(`🔒 Rate limiting: 10 requests per 30 seconds`);
        Logger.info(`🚫 Group messages: blocked (private chat only)`);
        Logger.info(`🏥 Health check available at http://localhost:${healthPort}/health`);
      },
    });
  } catch (error) {
    Logger.error('Failed to start bot', error);
    process.exit(1);
  }
}

process.once('SIGINT', () => {
  Logger.warn('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

process.once('SIGTERM', () => {
  Logger.warn('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

void main();

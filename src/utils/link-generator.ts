import { Bot } from 'grammy';
import retry from 'async-retry';
import { Logger } from './logger';

interface GroupLink {
  groupName: string;
  link: string;
  groupId: string;
}

interface LinkGenerationResult {
  links: GroupLink[];
  permissionMissing: boolean;
}

export class LinkGenerator {
  constructor(private bot: Bot) {}

  async generateLinks(groupIds: string[]): Promise<LinkGenerationResult> {
    let permissionMissing = false;

    // Generate links in parallel for better performance
    const linkPromises = groupIds.map(async (groupId) => {
      try {
        // Fetch chat info and create link in parallel
        const [chat, inviteLink] = await Promise.all([
          this.bot.api.getChat(groupId),
          this.createInviteLinkWithRetry(groupId),
        ]);

        const groupName = chat.title || `Group ${groupId}`;

        Logger.success(`Link generated for group: ${groupName} (${groupId})`, {
          groupId,
          groupName,
        });

        return {
          groupName,
          link: inviteLink.invite_link,
          groupId,
        };
      } catch (error) {
        const err = error as Error;
        Logger.error(`Failed to generate link for group ${groupId}`, err, { groupId });

        // Check for specific error types
        if (err.message.toLowerCase().includes('not enough rights')) {
          permissionMissing = true;
        }

        if (err.message.includes('chat not found')) {
          Logger.warn(`Group ${groupId} no longer exists or bot was removed`, { groupId });
        }

        if (err.message.includes('bot was kicked')) {
          Logger.error(`🚨 CRITICAL: Bot was removed from group ${groupId}`, undefined, {
            groupId,
            critical: true,
          });
        }

        return {
          groupName: `Group ${groupId} (Error)`,
          link: '❌ Failed to generate link',
          groupId,
        };
      }
    });

    // Wait for all links to be generated in parallel
    const links = await Promise.all(linkPromises);

    return { links, permissionMissing };
  }

  private generateRandomId(): string {
    return Math.random().toString(36).substring(2, 10);
  }

  private async createInviteLinkWithRetry(groupId: string): Promise<{ invite_link: string }> {
    return retry(
      async (bail: (e: Error) => void, attempt: number) => {
        try {
          Logger.debug(`Attempt ${attempt} to create link for group ${groupId}`, {
            groupId,
            attempt,
          });

          // Generate unique link name with random component
          const linkName = `VIP-${this.generateRandomId()}-${Date.now()}`;

          return await this.bot.api.createChatInviteLink(groupId, {
            expire_date: Math.floor(Date.now() / 1000) + 3600, // 1 hour
            member_limit: 1,
            name: linkName,
          });
        } catch (error: any) {
          // Handle rate limiting from Telegram API
          if (error.error_code === 429) {
            const retryAfter = error.parameters?.retry_after || 5;
            Logger.warn(`Rate limited. Retrying after ${retryAfter}s`, {
              groupId,
              retryAfter,
              attempt,
            });
            // The retry library will handle the delay
            throw error; // Retry
          }

          // Don't retry on permission errors
          if (
            error.message?.toLowerCase().includes('not enough rights') ||
            error.message?.includes('chat not found') ||
            error.message?.includes('bot was kicked')
          ) {
            bail(error); // Stop retrying
            return error;
          }

          // Retry on other errors
          throw error;
        }
      },
      {
        retries: 3,
        factor: 2,
        minTimeout: 1000,
        maxTimeout: 10000,
        onRetry: (error: Error, attempt: number) => {
          Logger.debug(`Retrying link creation for ${groupId}`, {
            groupId,
            attempt,
            error: error.message,
          });
        },
      }
    );
  }

  async testBotPermissions(groupIds: string[]): Promise<void> {
    Logger.info('Testing bot permissions in groups...');

    for (const groupId of groupIds) {
      try {
        const chat = await this.bot.api.getChat(groupId);
        const botMember = await this.bot.api.getChatMember(groupId, this.bot.botInfo.id);

        Logger.info(`Group: ${chat.title || groupId}`);
        Logger.info(`Bot status: ${botMember.status}`);

        if (botMember.status !== 'administrator') {
          Logger.warn(`⚠️  Bot is not an administrator in ${chat.title || groupId}`);
        } else {
          Logger.success(`✅ Bot has admin rights in ${chat.title || groupId}`);
        }
      } catch (error) {
        const err = error as Error;
        Logger.error(`Cannot access group ${groupId}:`, err.message);
      }
    }
  }
}

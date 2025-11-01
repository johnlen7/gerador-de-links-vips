import type { Context, NextFunction } from 'grammy';
import { config } from '../config';
import { Logger } from '../utils/logger';
import { Messages } from './messages';

export async function authMiddleware(ctx: Context, next: NextFunction): Promise<void> {
  const userId = ctx.from?.id;
  const username = ctx.from?.username;
  const chatType = ctx.chat?.type;

  if (!userId) {
    Logger.warn('Message received without user ID');
    return;
  }

  // Block bot from responding in groups
  if (chatType === 'group' || chatType === 'supergroup') {
    Logger.warn('Command received in group - ignoring', {
      userId,
      username,
      chatType,
      chatId: ctx.chat?.id,
    });
    return;
  }

  if (!config.authorizedUserIds.includes(userId)) {
    Logger.unauthorized(userId, username);
    await ctx.reply(Messages.accessDenied(), { parse_mode: 'Markdown' });
    return;
  }

  Logger.info(`Authorized user ${userId} ${username ? `(@${username})` : ''} accessed the bot`);
  await next();
}

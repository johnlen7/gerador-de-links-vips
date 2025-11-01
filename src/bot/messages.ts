import { config } from '../config';

export const Messages = {
  accessGranted: (links: Array<{ groupName: string; link: string }>) => {
    const linksList = links
      .map((item) => `🔗 **${item.groupName}**\n   Link: ${item.link}\n`)
      .join('\n');

    return `🎉 **Access Granted!**

Here are your exclusive VIP group links:

${linksList}
⚠️ **Important:**
• These links expire in **1 hour**
• Valid for **one person only**
• Groups covered: ${config.vipGroupIds.join(', ')}

👑 Welcome to the VIP community!`;
  },

  accessDenied: () => `🚫 **Access Denied**

Sorry, you don't have permission to use this bot.

This bot is restricted to authorized users only. If you believe this is an error, please contact the administrator.`,

  error: () => `❌ **Error Occurred**

An error occurred while generating your invite links.

Please verify that the bot is an **administrator** in every VIP group with the **"Invite Users via Link"** permission enabled, then try again. If the problem persists, contact the administrator.`,

  missingPermissions: () => `⚠️ **Permission Required**

The bot must be an administrator in every VIP group with the **"Invite Users via Link"** permission enabled to generate invite links.

Please promote the bot to admin, grant that permission, and try again.`,

  processingLinks: () => `⏳ **Processing...**

Generating your exclusive VIP invite links. This may take a few moments...`,

  welcome: () => `👋 **Welcome to VIP Link Generator Bot!**

Use /generate to create your exclusive invite links.

🔒 This bot is restricted to authorized users only.`,
};

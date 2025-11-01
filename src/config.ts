import dotenv from 'dotenv';
import path from 'path';
import { existsSync } from 'fs';

function loadEnvironment(): void {
  const envCandidates = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), '..', '.env'),
  ];

  for (const candidate of envCandidates) {
    if (existsSync(candidate)) {
      const result = dotenv.config({ path: candidate });
      if (!result.error) {
        console.log(`🔐 Environment variables loaded from ${candidate}`);
        return;
      }
    }
  }

  dotenv.config();
}

loadEnvironment();

interface Config {
  botToken: string;
  authorizedUserIds: number[];
  vipGroupIds: string[];
  nodeEnv: string;
}

function validateConfig(): Config {
  const botToken = process.env.BOT_TOKEN;
  const authorizedIds = process.env.AUTHORIZED_USER_IDS;
  const vipGroups = process.env.VIP_GROUP_IDS;

  if (!botToken) {
    throw new Error('❌ BOT_TOKEN is required in environment variables');
  }

  if (!authorizedIds || authorizedIds.trim() === '') {
    throw new Error('❌ AUTHORIZED_USER_IDS is required. Add at least one user ID.');
  }

  if (!vipGroups) {
    throw new Error('❌ VIP_GROUP_IDS is required in environment variables');
  }

  const authorizedUserIds = authorizedIds
    .split(',')
    .map((id) => parseInt(id.trim(), 10))
    .filter((id) => !isNaN(id));

  if (authorizedUserIds.length === 0) {
    throw new Error('❌ No valid user IDs found in AUTHORIZED_USER_IDS');
  }

  const vipGroupIds = vipGroups
    .split(',')
    .map((id) => id.trim())
    .filter((id) => {
      if (id.length === 0) return false;

      // Group IDs should start with -100 (supergroups/channels)
      if (!id.match(/^-100\d{10,}$/)) {
        console.warn(`⚠️  Invalid group ID format: ${id} (expected format: -100XXXXXXXXXX)`);
        return false;
      }

      return true;
    });

  if (vipGroupIds.length === 0) {
    throw new Error('❌ No valid group IDs found in VIP_GROUP_IDS. Format: -100XXXXXXXXXX');
  }

  console.log('✅ Configuration validated successfully');
  console.log(`📊 Authorized users: ${authorizedUserIds.length}`);
  console.log(`📊 VIP groups: ${vipGroupIds.length}`);

  return {
    botToken,
    authorizedUserIds,
    vipGroupIds,
    nodeEnv: process.env.NODE_ENV || 'development',
  };
}

export const config = validateConfig();

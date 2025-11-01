# Upgrade Guide: v1.0.0 → v2.0.0

## 🚨 CRITICAL: Security Update Required

### Step 1: Revoke Exposed Bot Token (URGENT)

The old .env.example accidentally contained a real bot token. You **MUST** regenerate your token:

1. Open Telegram and talk to [@BotFather](https://t.me/BotFather)
2. Send `/mybots`
3. Select your bot
4. Go to "Bot Settings" → "Regenerate Token"
5. Copy the new token
6. Update your environment variable:

```bash
# On Railway
railway variables set BOT_TOKEN=your_new_token_here

# Or update .env locally
BOT_TOKEN=your_new_token_here
```

### Step 2: Update Dependencies

```bash
npm install
```

New dependencies added:
- `@grammyjs/ratelimiter` - Rate limiting
- `async-retry` - Retry logic
- `pino` - Structured logging
- `pino-pretty` - Pretty logs (dev)

### Step 3: Update Code (if you modified it)

If you customized the bot, update your code:

**Before (v1.0.0):**
```typescript
const handlers = new CommandHandlers(linkGenerator);
```

**After (v2.0.0):**
```typescript
const metricsService = new MetricsService();
const handlers = new CommandHandlers(linkGenerator, metricsService);
```

### Step 4: Environment Variables

Add optional new variable for health check port:

```env
PORT=3000  # Optional, defaults to 3000
```

### Step 5: Test Locally

```bash
npm run dev
```

Check that:
- ✅ Bot starts without errors
- ✅ Health check responds at `http://localhost:3000/health`
- ✅ Logs are formatted nicely
- ✅ Rate limiting works (try 4 commands quickly)

### Step 6: Deploy to Railway

```bash
git add .
git commit -m "Upgrade to v2.0.0 with security fixes and performance improvements"
git push origin main
```

Railway will automatically:
- Install new dependencies
- Build the updated code
- Start health monitoring
- Apply rate limiting

### Step 7: Verify Production

1. Check Railway logs for startup messages
2. Visit health endpoint: `https://your-app.railway.app/health`
3. Test bot commands in Telegram
4. Use `/stats` (admin only) to see metrics

## 🎉 New Features Available

### For Users:
- **5x faster** link generation (parallel processing)
- Better error messages
- Automatic retry on transient errors

### For Admins:
- `/stats` command to view:
  - Total requests and success rate
  - Average response time
  - Top users
  - System uptime
- Health check endpoint for monitoring
- Structured logs for debugging

### For Developers:
- Professional Pino logging
- Metrics tracking built-in
- Better error handling
- Improved TypeScript types

## 📊 Monitoring

### Health Check Endpoint

```bash
curl https://your-bot.railway.app/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-31T...",
  "uptime": 3600,
  "bot": {
    "connected": true,
    "username": "YourBot"
  },
  "metrics": {
    "totalRequests": 42,
    "successRate": "95.2%",
    "averageResponseTime": 2341
  }
}
```

### View Logs

```bash
# Railway CLI
railway logs

# Or check Railway dashboard
```

Logs are now JSON in production:
```json
{"level":30,"time":1698765432000,"msg":"User requested link generation","userId":123}
```

## 🔄 Rollback (if needed)

If you encounter issues:

```bash
git revert HEAD
git push origin main
```

Then restore your old bot token from backup.

## 🆘 Troubleshooting

### Bot won't start

**Check:**
- BOT_TOKEN is set correctly
- AUTHORIZED_USER_IDS has at least one ID
- VIP_GROUP_IDS are in correct format (-100...)

### Rate limiting too strict

Adjust in `src/index.ts`:
```typescript
limit: 5,  // Change from 3 to 5
timeFrame: 60000,  // Keep at 1 minute
```

### Health check failing

**Verify:**
- Port 3000 is not blocked
- Bot API is reachable
- Railway assigned PORT variable is used

### Performance issues

Check Railway metrics:
- CPU usage
- Memory usage
- Response times

Consider upgrading Railway plan if needed.

## 📝 Notes

- Minimum Node.js version: 18.0.0
- All changes are backward compatible (except CommandHandlers constructor)
- No database required (metrics are in-memory)
- Health checks reset on restart

## 🤝 Support

Issues? Open a ticket on GitHub or contact the development team.

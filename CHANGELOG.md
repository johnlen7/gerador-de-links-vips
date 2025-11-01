# Changelog

All notable changes to the Telegram VIP Bot will be documented in this file.

## [2.0.0] - 2025-10-31

### 🔒 Security
- **CRITICAL**: Removed exposed bot token from .env.example
- Added rate limiting (3 requests per minute per user)
- Improved validation of Group IDs (must start with -100)
- Enhanced error logging without exposing sensitive data

### ⚡ Performance
- **5x faster**: Implemented parallel link generation
- Reduced average response time from ~10s to ~2s
- Added retry mechanism with exponential backoff for transient errors
- Optimized API calls with Promise.all()

### ✨ New Features
- Professional structured logging with Pino
- Real-time metrics tracking system
- `/stats` command for administrators
- Health check endpoint at `/health`
- Automatic retry on Telegram API rate limits
- Better edge case handling (deleted groups, bot kicked, etc.)

### 🐛 Bug Fixes
- Fixed race condition in concurrent link generation
- Safe message deletion (won't crash if message is already deleted)
- Proper handling of undefined chat context
- Thread-safe permission error tracking

### 📊 Monitoring
- Added MetricsService to track:
  - Total requests and link generations
  - Success/failure rates
  - Average response times
  - Per-user usage statistics
  - Bot uptime

### 🏥 Health & Reliability
- HTTP health check server on port 3000
- Graceful error handling for all edge cases
- Detailed error logging with context
- Improved bot startup validation

### 📝 Developer Experience
- Structured JSON logs in production
- Pretty console logs in development
- Comprehensive error messages
- Better TypeScript types

### 🔧 Infrastructure
- Updated Railway configuration with health checks
- Added proper .gitignore
- Improved build process
- Better dependency management

### 📦 Dependencies Added
- `@grammyjs/ratelimiter`: Rate limiting middleware
- `async-retry`: Retry logic with backoff
- `pino`: Professional logging library
- `pino-pretty`: Development log formatting

### Breaking Changes
- CommandHandlers constructor now requires MetricsService
- Logger methods now accept metadata objects
- Minimum Node.js version: 18.0.0

---

## [1.0.0] - Initial Release

### Features
- Basic link generation for VIP groups
- User authentication by Telegram ID
- Temporary links (1 hour expiry)
- Single-use links
- Railway deployment support

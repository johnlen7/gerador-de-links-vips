import http from 'http';
import type { Bot } from 'grammy';
import { Logger } from '../utils/logger';
import type { MetricsService } from './metrics-service';

export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  bot: {
    connected: boolean;
    username?: string;
  };
  metrics?: {
    totalRequests: number;
    successRate: string;
    averageResponseTime: number;
  };
}

export function startHealthCheckServer(
  bot: Bot,
  metricsService: MetricsService,
  port = 3000
): http.Server {
  const server = http.createServer(async (req, res) => {
    if (req.url === '/health' || req.url === '/') {
      try {
        // Check if bot is responsive
        const botInfo = await bot.api.getMe();
        const stats = metricsService.getStats();

        const successRate =
          stats.totalRequests > 0
            ? ((stats.successfulGenerations / stats.totalRequests) * 100).toFixed(1)
            : '0.0';

        const response: HealthCheckResponse = {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          bot: {
            connected: true,
            username: botInfo.username,
          },
          metrics: {
            totalRequests: stats.totalRequests,
            successRate: `${successRate}%`,
            averageResponseTime: Math.round(stats.averageResponseTime),
          },
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response, null, 2));

        Logger.debug('Health check passed', { endpoint: req.url });
      } catch (error) {
        const errorResponse: HealthCheckResponse = {
          status: 'unhealthy',
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          bot: {
            connected: false,
          },
        };

        res.writeHead(503, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(errorResponse, null, 2));

        Logger.error('Health check failed', error);
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });

  server.listen(port, () => {
    Logger.success(`Health check server running on port ${port}`, { port });
  });

  return server;
}

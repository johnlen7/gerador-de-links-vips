import pino from 'pino';

const pinoLogger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        }
      : undefined,
});

export class Logger {
  static info(message: string, meta?: Record<string, unknown>): void {
    pinoLogger.info({ ...meta }, message);
  }

  static error(message: string, error?: unknown, meta?: Record<string, unknown>): void {
    if (error instanceof Error) {
      pinoLogger.error({ ...meta, err: { message: error.message, stack: error.stack } }, message);
    } else {
      pinoLogger.error({ ...meta, error }, message);
    }
  }

  static success(message: string, meta?: Record<string, unknown>): void {
    pinoLogger.info({ ...meta, status: 'success' }, `✅ ${message}`);
  }

  static warn(message: string, meta?: Record<string, unknown>): void {
    pinoLogger.warn({ ...meta }, message);
  }

  static debug(message: string, meta?: Record<string, unknown>): void {
    pinoLogger.debug({ ...meta }, message);
  }

  static unauthorized(userId: number, username?: string): void {
    pinoLogger.warn(
      {
        event: 'unauthorized_access',
        userId,
        username: username || 'unknown',
      },
      '🚫 UNAUTHORIZED ACCESS ATTEMPT'
    );
  }

  static metric(
    metricName: string,
    value: number,
    meta?: Record<string, unknown>
  ): void {
    pinoLogger.info(
      {
        ...meta,
        metric: metricName,
        value,
      },
      `Metric: ${metricName}`
    );
  }
}

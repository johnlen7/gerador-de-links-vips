export interface Metrics {
  totalLinksGenerated: number;
  totalRequests: number;
  requestsByUser: Map<number, number>;
  failedGenerations: number;
  successfulGenerations: number;
  averageResponseTime: number;
  lastReset: Date;
  uptime: number;
}

export class MetricsService {
  private metrics: Metrics = {
    totalLinksGenerated: 0,
    totalRequests: 0,
    requestsByUser: new Map(),
    failedGenerations: 0,
    successfulGenerations: 0,
    averageResponseTime: 0,
    lastReset: new Date(),
    uptime: 0,
  };

  private startTime: number = Date.now();

  recordLinkGeneration(
    userId: number,
    linkCount: number,
    duration: number,
    failed: boolean
  ): void {
    this.metrics.totalRequests++;

    if (!failed) {
      this.metrics.totalLinksGenerated += linkCount;
      this.metrics.successfulGenerations++;
    } else {
      this.metrics.failedGenerations++;
    }

    const userRequests = this.metrics.requestsByUser.get(userId) || 0;
    this.metrics.requestsByUser.set(userId, userRequests + 1);

    // Calculate moving average of response time
    const totalTime = this.metrics.averageResponseTime * (this.metrics.totalRequests - 1) + duration;
    this.metrics.averageResponseTime = totalTime / this.metrics.totalRequests;
  }

  getStats(): Metrics {
    this.metrics.uptime = Math.floor((Date.now() - this.startTime) / 1000);
    return { ...this.metrics };
  }

  getTopUsers(limit = 5): Array<{ userId: number; requests: number }> {
    return Array.from(this.metrics.requestsByUser.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([userId, requests]) => ({ userId, requests }));
  }

  reset(): void {
    this.metrics = {
      totalLinksGenerated: 0,
      totalRequests: 0,
      requestsByUser: new Map(),
      failedGenerations: 0,
      successfulGenerations: 0,
      averageResponseTime: 0,
      lastReset: new Date(),
      uptime: 0,
    };
  }
}

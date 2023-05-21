import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggingService } from '../../logging.service';
import { Logger } from 'winston';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to log the request information
 *
 * @class RouteLogsMiddleware
 * @implements {NestMiddleware}
 * @param {LoggingService} loggingService
 * @exports RouteLogsMiddleware
 */
@Injectable()
export class RouteLogsMiddleware implements NestMiddleware {
  logger: Logger;

  constructor(private readonly loggingService: LoggingService) {
    this.logger = this.loggingService.getLogger('access');
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, httpVersion } = req;
    const query: string = JSON.stringify(req.query) || '{}';
    const body: string = JSON.stringify(req.body) || '{}';
    const endpoint: string = url.substring(
      0,
      url.indexOf('?') > -1 ? url.indexOf('?') : url.length,
    );
    const session: string = req.body.sessionID
      ? req.body.sessionID
      : 'no session';
    const ip: string = req.ip || 'no ip';
    const user: string = req.body.user ? req.body.user.id : 'no user';
    const status: string | number = res.statusCode || 'no status';
    const responseTime: string =
      res.get('X-Response-Time') || 'no response time';
    const referrer: string = req.headers.referer || 'no referer';
    const userAgent: string = req.headers['user-agent'] || 'no user agent';
    const contentLength: string =
      res.get('Content-Length') || 'no content length';

    const message = `${method} Request for endpoint: ${endpoint}`;
    const metadata: Record<string, any> = {
      httpVersion,
      query,
      body,
      ip,
      user,
      status,
      responseTime,
      referrer,
      userAgent,
      session,
      contentLength,
    };

    this.logger.info(message, metadata);

    next();
  }
}

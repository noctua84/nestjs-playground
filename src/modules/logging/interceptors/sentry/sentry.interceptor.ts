import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import Sentry from '@sentry/node';

/**
 * Sentry interceptor
 *
 * @class SentryInterceptor
 * @implements {NestInterceptor}
 * @description Intercepts all errors and sends them to Sentry
 * @export SentryInterceptor
 */
@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        Sentry.captureException(error);
        throw error;
      }),
    );
  }
}

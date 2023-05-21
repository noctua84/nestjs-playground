import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SentryInterceptor } from './sentry.interceptor';
import Sentry from '@sentry/node';

jest.mock('@sentry/node', () => ({
  captureException: jest.fn(),
}));

describe('SentryInterceptor', () => {
  let interceptor: SentryInterceptor;
  let context: ExecutionContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SentryInterceptor],
    }).compile();

    interceptor = module.get<SentryInterceptor>(SentryInterceptor);
    context = {} as ExecutionContext;
  });

  it('should call Sentry.captureException when an exception is thrown', () => {
    const error = new Error('Test error');
    const next = {
      handle: () =>
        new Observable((subscriber) => {
          subscriber.error(error);
        }),
    } as CallHandler;

    interceptor.intercept(context, next).subscribe({
      error: (e) => {
        expect(e).toEqual(error);
        expect(Sentry.captureException).toHaveBeenCalledWith(error);
      },
    });
  });
});

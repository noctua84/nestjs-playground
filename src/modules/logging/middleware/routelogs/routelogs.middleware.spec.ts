import { Test } from '@nestjs/testing';
import { LoggingService } from '../../logging.service';
import { RouteLogsMiddleware } from './routelogs.middleware';
import winston from 'winston';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { accessLogFormat } from '../../config/helper/formats/log.formats';
import { Request, Response } from 'express';
import sinon from 'sinon';

describe('RouteLogsMiddleware', () => {
  let loggingService: LoggingService;
  let routeLogsMiddleware: RouteLogsMiddleware;
  let configService: ConfigService;

  beforeEach(async () => {
    const mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        LoggingService,
        RouteLogsMiddleware,
        { provide: 'winston', useValue: mockLogger },
        { provide: 'ConfigService', useValue: { get: jest.fn() } },
      ],
    }).compile();

    loggingService = moduleRef.get<LoggingService>(LoggingService);
    routeLogsMiddleware =
      moduleRef.get<RouteLogsMiddleware>(RouteLogsMiddleware);
    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  describe('Dependencies are defined', () => {
    it('should have an instance of the middleware to be defined', () => {
      expect(routeLogsMiddleware).toBeDefined();
    });

    it('should have a logging service', () => {
      expect(loggingService).toBeDefined();
    });

    it('should have a config service', () => {
      expect(configService).toBeDefined();
    });
  });

  describe('Middleware is used', () => {
    const testLogRequest = (hasSessionId: boolean) => {
      const req: Partial<Request> = {
        method: 'GET',
        url: '/test',
        httpVersion: '1.1',
        query: {},
        body: {
          ...(hasSessionId ? { sessionId: 'test-session-id' } : {}),
          user: { id: 'test-user-id' },
        },
        headers: {
          referer: 'https://example.com',
          'user-agent': 'Test User Agent',
        },
        ip: '127.0.0.1',
      };

      const res: Partial<Response> = {
        statusCode: 200,
        get: (headerName: string) => {
          if (headerName === 'X-Response-Time') return '100ms';
          if (headerName === 'Content-Length') return '1024';
          return null;
        },
      };
      const next = jest.fn();

      const reqMock = sinon.mock(req);
      sinon.assert.match(reqMock.object, req);

      const resMock = sinon.mock(res);
      sinon.assert.match(resMock.object, res);
      resMock.expects('get').withArgs('X-Response-Time').returns('100ms');
      resMock.expects('get').withArgs('Content-Length').returns('1024');

      jest.spyOn(winston, 'createLogger').mockImplementation(() => {
        return {
          info: jest
            .fn()
            .mockImplementation(
              (message: string, meta: Record<string, any>) => {
                const formattedMessage = accessLogFormat.transform({
                  message,
                  meta,
                  level: 'info',
                });
              },
            ),
        } as unknown as winston.Logger;
      });

      jest.spyOn(loggingService, 'getLogger');
      jest.spyOn(routeLogsMiddleware.logger, 'info');

      routeLogsMiddleware.use(reqMock.object, resMock.object, next);

      expect(routeLogsMiddleware.logger.info).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    };

    it('should log the request information with session id', () => {
      testLogRequest(true);
    });

    it('should log the request information without session id', () => {
      testLogRequest(false);
    });
  });
});

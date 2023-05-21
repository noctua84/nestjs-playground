import { Test, TestingModule } from '@nestjs/testing';
import { LoggingService } from './logging.service';
import { createLogger, Logger } from 'winston';
import { ConfigService } from '@nestjs/config';

describe('LoggingService', () => {
  let service: LoggingService;
  let logger: Logger;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggingService,
        {
          provide: 'winston',
          useValue: createLogger(),
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LoggingService>(LoggingService);
    logger = module.get<Logger>('winston');
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('constructor', () => {
    it('logging service should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should have a logger', () => {
      expect(logger).toBeDefined();
    });

    it('should have a config service', () => {
      expect(configService).toBeDefined();
    });
  });

  describe('exporting three types of loggers as a singleton', () => {
    it('should create and reuse an event logger', () => {
      const eventLogger1: Logger = service.getLogger('event');
      const eventLogger2: Logger = service.getLogger('event');

      expect(eventLogger1).toBeDefined();
      expect(eventLogger2).toBeDefined();
      expect(eventLogger1).toBe(eventLogger2);
    });

    it('should create and reuse an access logger', () => {
      const accessLogger1: Logger = service.getLogger('access');
      const accessLogger2: Logger = service.getLogger('access');

      expect(accessLogger1).toBeDefined();
      expect(accessLogger2).toBeDefined();
      expect(accessLogger1).toBe(accessLogger2);
    });

    it('should create an app logger', () => {
      const appLogger1: Logger = service.getLogger('app');
      const appLogger2: Logger = service.getLogger('app');

      expect(appLogger1).toBeDefined();
      expect(appLogger2).toBeDefined();
      expect(appLogger1).toBe(appLogger2);
    });
  });

  describe('log message for each level and endpoint', () => {
    describe('Loglevel: info', () => {
      it.each(['app', 'access', 'event'])(
        'should log a message for %s logger',
        (endpoint: string) => {
          const logger: Logger = service.getLogger(endpoint);
          const message = 'test message';
          const metadata: object = { test: 'metadata' };

          const spy: jest.SpyInstance = jest
            .spyOn(logger, 'info')
            .mockReturnValue(logger);
          logger.info(message, metadata);

          expect(spy).toHaveBeenCalledWith(message, metadata);
        },
      );
    });

    describe('Loglevel: warn', () => {
      it.each(['app', 'access', 'event'])(
        'should log a message for %s logger',
        (endpoint: string) => {
          const logger: Logger = service.getLogger(endpoint);
          const message = 'test message';
          const metadata: object = { test: 'metadata' };

          const spy: jest.SpyInstance = jest
            .spyOn(logger, 'warn')
            .mockReturnValue(logger);
          logger.warn(message, metadata);

          expect(spy).toHaveBeenCalledWith(message, metadata);
        },
      );
    });

    describe('Loglevel: error', () => {
      it.each(['app', 'access', 'event'])(
        'should log a message for %s logger',
        (endpoint: string) => {
          const logger: Logger = service.getLogger(endpoint);
          const message = 'test message';
          const metadata: object = { test: 'metadata' };

          const spy: jest.SpyInstance = jest
            .spyOn(logger, 'error')
            .mockReturnValue(logger);
          logger.error(message, metadata);

          expect(spy).toHaveBeenCalledWith(message, metadata);
        },
      );
    });
  });
});

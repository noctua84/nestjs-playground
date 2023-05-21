import { Test } from '@nestjs/testing';
import {
  consoleTransport,
  appDatabaseTransport,
  accessLogDatabaseTransport,
  sentryTransport,
} from './log.transports';
import { ConfigService } from '@nestjs/config';
import SentryTransport from 'winston-transport-sentry-node';

jest.mock('winston/lib/winston/transports', () => ({
  Console: jest.fn().mockImplementation(() => ({
    format: jest.fn(),
  })),
}));

jest.mock('winston-mongodb', () => ({
  MongoDB: jest.fn().mockImplementation(() => ({
    format: jest.fn(),
  })),
}));

jest.mock('winston-transport-sentry-node', () => {
  return jest.fn().mockImplementation(() => ({
    format: jest.fn(),
    level: 'error',
    sentry: {},
  }));
});

jest.mock('@nestjs/config', () => ({
  ConfigService: jest.fn().mockImplementation(() => ({
    get: jest.fn().mockImplementation((key: string) => {
      switch (key) {
        case 'db.mongodb.uri':
          return 'mongodb://localhost:27017/test';
        case 'logging.server.collection':
        case 'logging.access.collection':
        case 'logging.rejection.collection':
        case 'logging.crash.collection':
          return 'test-collection';
        case 'logging.server.level':
        case 'logging.access.level':
        case 'logging.rejection.level':
        case 'logging.crash.level':
          return 'info';
        case 'sentry.log_level':
          return 'error';
        case 'logging.server.store_host':
        case 'logging.access.store_host':
        case 'logging.rejection.store_host':
        case 'logging.crash.store_host':
          return 'false';
        default:
          return null;
      }
    }),
  })),
}));

describe('Log Transports', () => {
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Define transports', () => {
    it('should create a console transport', () => {
      expect(consoleTransport).toHaveProperty('format');
    });

    describe(' Define App database transport with various options', () => {
      it('should create an app database transport', () => {
        const transport = appDatabaseTransport(configService);
        expect(transport).toHaveProperty('format');
      });

      it('should create an app database transport with rejection target', () => {
        const transport = appDatabaseTransport(configService, 'rejection');
        expect(transport).toHaveProperty('format');
      });

      it('should create an app database transport with exception target', () => {
        const transport = appDatabaseTransport(configService, 'exception');
        expect(transport).toHaveProperty('format');
      });
    });

    it('should create an access log database transport', () => {
      const transport = accessLogDatabaseTransport(configService);
      expect(transport).toHaveProperty('format');
    });

    it('should create a Sentry transport', () => {
      const transport = sentryTransport(configService);
      expect(transport).toHaveProperty('format');
      expect(transport).toHaveProperty('level');
      expect(transport).toHaveProperty('sentry');
    });
  });

  describe('Console transport', () => {
    it('should have the correct format', () => {
      expect(consoleTransport.format).toBeDefined();
    });
  });

  describe('Sentry transport', () => {
    it('should have the correct format', () => {
      const transport: SentryTransport = sentryTransport(configService);
      expect(transport.format).toBeDefined();
    });

    it('should have the correct level', () => {
      const transport: SentryTransport = sentryTransport(configService);
      expect(transport.level).toEqual('error');
    });

    it('should have a sentry options object', () => {
      const transport: SentryTransport = sentryTransport(configService);
      expect(transport.sentry).toBeDefined();
    });
  });
});

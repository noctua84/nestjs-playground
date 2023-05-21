import winston from 'winston';
import { consoleLogFormat, sentryFormat } from '../formats/log.formats';
import { ConsoleTransportInstance } from 'winston/lib/winston/transports';
import { ConfigService } from '@nestjs/config';
import { MongoDB } from 'winston-mongodb';
import SentryTransport from 'winston-transport-sentry-node';

/**
 * Console transport
 */
export const consoleTransport: ConsoleTransportInstance =
  new winston.transports.Console({ format: consoleLogFormat });

/**
 * Arrow function to create a mongodb transport for Server log collection
 *
 * @param configService
 * @param target
 */
export const appDatabaseTransport = (
  configService: ConfigService,
  target?: string,
) => {
  const dbUrl = configService.get('db.mongodb.uri');
  let logCollection: string;
  let logLevel: string;
  let storeHost: boolean;

  switch (target) {
    case 'rejection':
      logCollection = configService.get('logging.rejection.collection');
      logLevel = configService.get('logging.rejection.level');
      storeHost = Boolean(configService.get('logging.rejection.store_host'));
      break;
    case 'exception':
      logCollection = configService.get('logging.crash.collection');
      logLevel = configService.get('logging.crash.level');
      storeHost = Boolean(configService.get('logging.crash.store_host'));
      break;
    default:
      logCollection = configService.get('logging.server.collection');
      logLevel = configService.get('logging.server.level');
      storeHost = Boolean(configService.get('logging.server.store_host'));
  }

  return new MongoDB({
    db: dbUrl,
    options: {
      useUnifiedTopology: true,
    },
    collection: logCollection,
    level: logLevel,
    storeHost: storeHost,
    tryReconnect: true,
    leaveConnectionOpen: false,
  });
};

/**
 * Arrow function to create a mongodb transport for Access log collection
 *
 * @param configService
 */
export const accessLogDatabaseTransport = (configService: ConfigService) => {
  const dbUrl = configService.get('db.mongodb.uri');
  const logCollection = configService.get('logging.access.collection');
  const logLevel = configService.get('logging.access.level');
  const storeHost = Boolean(configService.get('logging.access.store_host'));

  return new MongoDB({
    db: dbUrl,
    options: {
      useUnifiedTopology: true,
    },
    collection: logCollection,
    level: logLevel,
    storeHost: storeHost,
    tryReconnect: true,
    leaveConnectionOpen: false,
  });
};

/**
 * Arrow function to create a Sentry transport instance
 *
 * @param configService
 * @returns SentryTransport
 */
export const sentryTransport = (
  configService: ConfigService,
): SentryTransport => {
  const options = {
    sentry: {
      dsn: configService.get('sentry.dsn'),
      environment: configService.get('sentry.environment'),
      serverName: configService.get('sentry.server_name'),
      release: configService.get('sentry.release'),
      debug: configService.get('sentry.debug'),
      sampleRate: configService.get('sentry.sample_rate'),
      maxBreadcrumbs: configService.get('sentry.max_breadcrumbs'),
    },
    level: configService.get('sentry.log_level'),
    format: sentryFormat(),
  };

  return new SentryTransport(options);
};

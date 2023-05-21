import { LoggerOptions } from 'winston';
import { logFormat } from './helper/formats/log.formats';
import {
  consoleTransport,
  appDatabaseTransport,
  sentryTransport,
} from './helper/transports/log.transports';
import { ConfigService } from '@nestjs/config';

export const errorLogConfig = (configService: ConfigService): LoggerOptions => {
  const logLevel = configService.get('logging.server.level');

  const transports = [];
  const rejectionHandlers = [];
  const exceptionHandlers = [];

  if (process.env.NODE_ENV !== 'production') {
    transports.push(consoleTransport);
    rejectionHandlers.push(consoleTransport);
    exceptionHandlers.push(consoleTransport);
  } else {
    // add sentry transport if enabled
    if (configService.get('logging.transports.sentry.enable')) {
      transports.push(sentryTransport(configService));
      rejectionHandlers.push(sentryTransport(configService));
      exceptionHandlers.push(sentryTransport(configService));
    }

    transports.push(appDatabaseTransport(configService));
    rejectionHandlers.push(appDatabaseTransport(configService, 'rejection'));
    exceptionHandlers.push(appDatabaseTransport(configService, 'exception'));
  }

  return {
    level: logLevel,
    format: logFormat,
    transports: transports,
    handleExceptions: Boolean(configService.get('logging.crash.enable')),
    handleRejections: Boolean(configService.get('logging.rejection.enable')),
    rejectionHandlers: rejectionHandlers,
    exceptionHandlers: exceptionHandlers,
    silent: false,
    exitOnError: false,
  };
};

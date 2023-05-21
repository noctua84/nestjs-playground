import { ConfigService } from '@nestjs/config';
import {
  accessLogDatabaseTransport,
  consoleTransport,
} from './helper/transports/log.transports';
import { accessLogFormat } from './helper/formats/log.formats';
import { LoggerOptions } from 'winston';

/**
 * Access log configuration
 *
 * @param configService
 * @returns LoggerOptions
 */
export const accessLogConfig = (
  configService: ConfigService,
): LoggerOptions => {
  const logLevel = configService.get('logging.access.level');

  const transports = [];

  if (process.env.NODE_ENV !== 'production') {
    transports.push(consoleTransport);
  } else {
    transports.push(accessLogDatabaseTransport(configService));
  }

  return {
    level: logLevel,
    transports: transports,
    silent: false,
    exitOnError: false,
    format: accessLogFormat,
    handleExceptions: false,
    handleRejections: false,
  };
};

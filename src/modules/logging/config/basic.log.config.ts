import { ConfigService } from '@nestjs/config';
import { LoggerOptions } from 'winston';
import { logFormat } from './helper/formats/log.formats';
import { consoleTransport } from './helper/transports/log.transports';

export const basicLogConfig = (configService: ConfigService): LoggerOptions => {
  const logLevel = configService.get('logging.global.level');

  return {
    level: logLevel,
    format: logFormat,
    transports: [consoleTransport],
    silent: false,
    exitOnError: false,
  };
};

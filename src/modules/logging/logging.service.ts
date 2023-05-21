import { Inject, Injectable } from '@nestjs/common';
import { createLogger, Logger, LoggerOptions } from 'winston';
import { ConfigService } from '@nestjs/config';
import { errorLogConfig } from './config/error.log.config';
import { basicLogConfig } from './config/basic.log.config';
import { accessLogConfig } from './config/access.log.config';

/**
 * Service to manage the loggers.
 * It follows the singleton and factory patterns.
 * It uses the winston library to create the loggers.
 * It uses the ConfigService (nestjs/config) to get the configuration.
 *
 * @class LoggingService
 * @param {object} logger - Winston logger
 * @param {object} configService - Config service
 * @export LoggingService
 */
@Injectable()
export class LoggingService {
  private readonly loggers: Map<string, Logger>;
  constructor(
    @Inject('winston') private readonly logger: Logger,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    this.loggers = new Map<string, Logger>();
  }

  /**
   * Private method to get or create the event logger.
   * It follows the singleton pattern.
   *
   * @private
   * @returns Logger
   */
  private getEventLogger(): Logger {
    if (this.loggers.has('event')) {
      return this.loggers.get('event');
    }

    const loggerOptions: LoggerOptions = basicLogConfig(this.configService);
    const logger: Logger = createLogger(loggerOptions);
    this.loggers.set('event', logger);

    return logger;
  }

  /**
   * Private method to get or create the app logger.
   * It follows the singleton pattern.
   *
   * @private
   * @returns Logger
   */
  private getAppLogger(): Logger {
    if (this.loggers.has('app')) {
      return this.loggers.get('app');
    }

    const loggerOptions: LoggerOptions = errorLogConfig(this.configService);
    const logger: Logger = createLogger(loggerOptions);
    this.loggers.set('app', logger);

    return logger;
  }

  /**
   * Private method to get or create the access logger.
   * It follows the singleton pattern.
   *
   * @private
   * @returns Logger
   */
  private getAccessLogger(): Logger {
    if (this.loggers.has('access')) {
      return this.loggers.get('access');
    }

    const loggerOptions: LoggerOptions = accessLogConfig(this.configService);
    const logger: Logger = createLogger(loggerOptions);
    this.loggers.set('access', logger);

    return logger;
  }

  /**
   * Public method to get a logger by name.
   * It follows the factory pattern.
   *
   * @param name
   * @returns Logger
   */
  getLogger(name: string): Logger {
    switch (name) {
      case 'event':
        return this.getEventLogger();
      case 'access':
        return this.getAccessLogger();
      default:
        return this.getAppLogger();
    }
  }
}

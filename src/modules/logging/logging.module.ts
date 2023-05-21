import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import winston from 'winston';

/**
 * Logging module
 *
 * @module LoggingModule
 * @param {object} winston - Winston logger
 * @param {object} LoggingService - Logging service
 * @exports LoggingModule
 */
@Module({
  providers: [LoggingService, { provide: 'winston', useValue: winston }],
  imports: [],
  exports: [LoggingService],
})
export class LoggingModule {}

import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ILOGGER_TOKEN_PROVIDER } from '../../domain/logger/logger.interface';

export const LOGGER_SERVICE_PROVIDER = {
  provide: ILOGGER_TOKEN_PROVIDER,
  useClass: LoggerService,
};
@Module({
  providers: [LoggerService, LOGGER_SERVICE_PROVIDER],
  exports: [LoggerService, LOGGER_SERVICE_PROVIDER],
})
export class LoggerModule {}

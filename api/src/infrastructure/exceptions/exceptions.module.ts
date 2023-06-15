import { Module } from '@nestjs/common';
import { ExceptionsService } from './exceptions.service';
import { IEXCEPTION_TOKEN_PROVIDER } from '../../domain/exceptions/exceptions.interface';

const PROVIDER = {
  provide: IEXCEPTION_TOKEN_PROVIDER,
  useClass: ExceptionsService,
};
@Module({
  providers: [ExceptionsService, PROVIDER],
  exports: [ExceptionsService, PROVIDER],
})
export class ExceptionsModule {}

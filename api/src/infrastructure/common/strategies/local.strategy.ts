import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { LOGIN_USECASES_PROXY } from '../../usecases-proxy/usecases-proxy.module';
import { LoginUseCase } from '../../../usecases/auth/login.usecase';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import {
  ILOGGER_TOKEN_PROVIDER,
  ILogger,
} from '../../../domain/logger/logger.interface';
import {
  IEXCEPTION_TOKEN_PROVIDER,
  IException,
} from '../../../domain/exceptions/exceptions.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCase>,

    @Inject(ILOGGER_TOKEN_PROVIDER) private readonly logger: ILogger,

    @Inject(IEXCEPTION_TOKEN_PROVIDER)
    private readonly exceptionService: IException,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    if (!username || !password) {
      this.logger.warn(
        'LocalStrategy',
        `Username or password is missing, BadRequestException`,
      );
      this.exceptionService.UnauthorizedException();
    }
    const user = await this.loginUsecaseProxy
      .getInstance()
      .execute(username, password);
    if (!user) {
      this.logger.warn('LocalStrategy', `Invalid username or password`);
      this.exceptionService.UnauthorizedException({
        message: 'Invalid username or password.',
      });
    }
    return user;
  }
}

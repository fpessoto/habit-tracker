import { DynamicModule, Module, Provider } from '@nestjs/common';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { RepositoriesModule } from '../repositories/repositories.module';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { UseCaseProxy } from './usecases-proxy';

import { PrismaCategoryRepository } from '../repositories/category.repository';
import { ILOGGER_TOKEN_PROVIDER } from '../../domain/logger/logger.interface';
import {
  CATEGORY_REPOSITORY_TOKEN_PROVIDER,
  CategoryRepository,
} from '../../domain/repositories/categoryRepository.interface';
import { CreateCategoryUseCase } from '../../usecases/category/createCategory.usecase';
import { LoginUseCase } from '../../usecases/auth/login.usecase';
import { LogoutUseCase } from '../../usecases/auth/logout.usecase';
import { IsAuthenticatedUseCase } from '../../usecases/auth/isAuthenticated.usecase';
import {
  USER_REPOSITORY_TOKEN_PROVIDER,
  UserRepository,
} from '../../domain/repositories/user.repository';
import { PrismaUserRepository } from '../repositories/user.repository';
import { JwtTokenService } from '../services/jwt/jwt.service';
import {
  JWTConfig,
  JWT_CONFIG_TOKEN,
} from '../../domain/config/jwt-config.interface';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import {
  IJwtService,
  JWT_SERVICE_TOKEN_PROVIDER,
} from '../../domain/adapters/jwt-service.interface';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { JwtModule } from '../services/jwt/jwt.module';

//DEPENDECIES
export const LOGGER_SERVICE_PROVIDER = {
  provide: ILOGGER_TOKEN_PROVIDER,
  useValue: LoggerService,
};

export const CATEGORY_REPOSITORY_PROVIDER = {
  provide: CATEGORY_REPOSITORY_TOKEN_PROVIDER,
  useValue: PrismaCategoryRepository,
};

//USE CASE PROVIDERS
export const CREATE_CATEGORY_USECASES_PROXY = 'createCategoryUseCasesProxy';
const CREATE_CATEGORY_USECASES_PROVIDER: Provider = {
  inject: [
    LOGGER_SERVICE_PROVIDER.useValue,
    CATEGORY_REPOSITORY_PROVIDER.useValue,
  ],
  provide: CREATE_CATEGORY_USECASES_PROXY,
  useFactory: (logger: LoggerService, categoryRepo: CategoryRepository) =>
    new UseCaseProxy(new CreateCategoryUseCase(logger, categoryRepo)),
};

export const JWT_SERVICE_PROVIDER = {
  provide: JWT_SERVICE_TOKEN_PROVIDER,
  useValue: JwtTokenService,
};

export const JWT_CONFIG_PROVIDER = {
  provide: JWT_CONFIG_TOKEN,
  useValue: EnvironmentConfigService,
};

export const USER_REPOSITORY_PROVIDER = {
  provide: USER_REPOSITORY_TOKEN_PROVIDER,
  useValue: PrismaUserRepository,
};

export const LOGIN_USECASES_PROXY = 'loginUseCaseProxy';
export const LOGIN_USECASES_PROVIDER: Provider = {
  inject: [
    JWT_SERVICE_PROVIDER.useValue,
    JWT_CONFIG_PROVIDER.useValue,
    USER_REPOSITORY_PROVIDER.useValue,
  ],
  provide: LOGIN_USECASES_PROXY,
  useFactory: (
    jwtService: IJwtService,
    jwtConfig: JWTConfig,
    userRepository: UserRepository,
  ): UseCaseProxy<LoginUseCase> =>
    new UseCaseProxy(new LoginUseCase(jwtService, jwtConfig, userRepository)),
};

export const LOGOUT_USECASES_PROXY = 'logoutUseCaseProxy';
export const LOGOUT_USECASES_PROVIDER: Provider = {
  inject: [],
  provide: LOGOUT_USECASES_PROXY,
  useFactory: () => new UseCaseProxy(new LogoutUseCase()),
};

export const IS_AUTHENTICATED_USECASES_PROXY = 'createCategoryUseCasesProxy';
export const IS_AUTHENTICATED_USECASES_PROVIDER: Provider = {
  inject: [],
  provide: IS_AUTHENTICATED_USECASES_PROXY,
  useFactory: () => new UseCaseProxy(new IsAuthenticatedUseCase()),
};

@Module({
  imports: [
    LoggerModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    JwtModule,
    BcryptModule,
    ExceptionsModule,
  ],
})
export class UsecasesProxyModule {
  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        CREATE_CATEGORY_USECASES_PROVIDER,
        LOGIN_USECASES_PROVIDER,
        LOGOUT_USECASES_PROVIDER,
        IS_AUTHENTICATED_USECASES_PROVIDER,
      ],
      exports: [
        CREATE_CATEGORY_USECASES_PROVIDER,
        LOGIN_USECASES_PROVIDER,
        LOGOUT_USECASES_PROVIDER,
        IS_AUTHENTICATED_USECASES_PROVIDER,
      ],
    };
  }
}

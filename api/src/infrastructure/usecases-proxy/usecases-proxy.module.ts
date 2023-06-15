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

const loggerProvider = {
  provide: ILOGGER_TOKEN_PROVIDER,
  useValue: LoggerService,
};

const categoryRepositoryProvider = {
  provide: CATEGORY_REPOSITORY_TOKEN_PROVIDER,
  useValue: PrismaCategoryRepository,
};

export const CREATE_CATEGORY_USECASES_PROXY = 'createCategoryUseCasesProxy';
const CREATE_CATEGORY_USECASES_PROVIDER: Provider = {
  inject: [loggerProvider.useValue, categoryRepositoryProvider.useValue],
  provide: CREATE_CATEGORY_USECASES_PROXY,
  useFactory: (logger: LoggerService, categoryRepo: CategoryRepository) =>
    new UseCaseProxy(new CreateCategoryUseCase(logger, categoryRepo)),
};

export const LOGIN_USECASES_PROXY = 'createCategoryUseCasesProxy';
const LOGIN_USECASES_PROVIDER: Provider = {
  inject: [],
  provide: LOGIN_USECASES_PROXY,
  useFactory: () => new UseCaseProxy(new LoginUseCase()),
};

export const LOGOUT_USECASES_PROXY = 'createCategoryUseCasesProxy';
const LOGOUT_USECASES_PROVIDER: Provider = {
  inject: [],
  provide: LOGOUT_USECASES_PROXY,
  useFactory: () => new UseCaseProxy(new LogoutUseCase()),
};

export const IS_AUTHENTICATED_USECASES_PROXY = 'createCategoryUseCasesProxy';
const IS_AUTHENTICATED_USECASES_PROVIDER: Provider = {
  inject: [],
  provide: IS_AUTHENTICATED_USECASES_PROXY,
  useFactory: () => new UseCaseProxy(new IsAuthenticatedUseCase()),
};

@Module({
  imports: [
    LoggerModule,
    EnvironmentConfigModule,
    RepositoriesModule,
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

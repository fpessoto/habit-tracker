import { DynamicModule, Module, Provider } from '@nestjs/common';


import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { RepositoriesModule } from '../repositories/repositories.module';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { UseCaseProxy } from './usecases-proxy';
import { CreateCategoryUseCase } from 'src/usecases/category/createCategory.usecase';
import {
  CATEGORY_REPOSITORY_TOKEN_PROVIDER,
  CategoryRepository,
} from 'src/domain/repositories/categoryRepository.interface';
import { PrismaCategoryRepository } from '../repositories/category.repository';
import { ILOGGER_TOKEN_PROVIDER } from '../../domain/logger/logger.interface';

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
  inject: [loggerProvider.provide, categoryRepositoryProvider.provide],
  provide: CREATE_CATEGORY_USECASES_PROXY,
  useFactory: (logger: LoggerService, categoryRepo: CategoryRepository) =>
    new UseCaseProxy(new CreateCategoryUseCase(logger, categoryRepo)),
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
      providers: [CREATE_CATEGORY_USECASES_PROVIDER],
      exports: [CREATE_CATEGORY_USECASES_PROXY],
    };
  }
}

import { DynamicModule, Module } from '@nestjs/common';


import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { RepositoriesModule } from '../repositories/repositories.module';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { UseCaseProxy } from './usecases-proxy';
import { createCategoryUseCase } from 'src/usecases/category/createCategory.usecase';
import { CategoryRepository } from 'src/domain/repositories/categoryRepository.interface';
import { PrismaCategoryRepository } from '../repositories/category.repository';

@Module({
  imports: [LoggerModule, EnvironmentConfigModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {


  static CREATE_CATEGORY_USECASES_PROXY = 'createCategoryUseCasesProxy';


  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [LoggerService, PrismaCategoryRepository],
          provide: UsecasesProxyModule.CREATE_CATEGORY_USECASES_PROXY,
          useFactory: (logger: LoggerService, categoryRepo: CategoryRepository) => new UseCaseProxy(new createCategoryUseCase(logger, categoryRepo)),
        },
      ],
      exports: [
        UsecasesProxyModule.CREATE_CATEGORY_USECASES_PROXY,
      ],
    };
  }
}
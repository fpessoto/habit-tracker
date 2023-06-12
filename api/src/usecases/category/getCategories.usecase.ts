import { Inject } from '@nestjs/common';
import {
  ILOGGER_TOKEN_PROVIDER,
  ILogger,
} from '../../domain/logger/logger.interface';
import {
  CATEGORY_REPOSITORY_TOKEN_PROVIDER,
  CategoryRepository,
} from '../../domain/repositories/categoryRepository.interface';
import { CategoryModel } from '../../domain/model/category';
export class GetCategoriesUseCase {
  constructor(
    @Inject(ILOGGER_TOKEN_PROVIDER) private readonly logger: ILogger,
    @Inject(CATEGORY_REPOSITORY_TOKEN_PROVIDER)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(userId: string): Promise<CategoryModel[]> {
    return await this.categoryRepository.findByUserId(userId);
  }
}

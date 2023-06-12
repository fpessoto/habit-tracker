import { Inject } from '@nestjs/common';
import {
  ILOGGER_TOKEN_PROVIDER,
  ILogger,
} from '../../domain/logger/logger.interface';
import {
  CATEGORY_REPOSITORY_TOKEN_PROVIDER,
  CategoryRepository,
} from '../../domain/repositories/categoryRepository.interface';

export class UpdateCategoryUseCase {
  constructor(
    @Inject(ILOGGER_TOKEN_PROVIDER) private readonly logger: ILogger,
    @Inject(CATEGORY_REPOSITORY_TOKEN_PROVIDER)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(
    categoryId: string,
    categoryName: string,
    userId: string,
  ): Promise<void> {
    const existentCategories = await this.categoryRepository.findByCategoryName(
      {
        userId,
        categoryName,
      },
    );

    this.categoryRepository;

    if (existentCategories && existentCategories.length > 0)
      throw new Error('This category already exists');

    await this.categoryRepository.updateName(categoryId, categoryName);

    this.logger.log(
      'UpdateCategoryUseCase execute',
      'category have been updated',
    );
  }
}

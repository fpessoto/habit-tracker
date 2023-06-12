import { CategoryModel } from '../../domain/model/category';
import {
  ILOGGER_TOKEN_PROVIDER,
  ILogger,
} from '../../domain/logger/logger.interface';
import {
  CATEGORY_REPOSITORY_TOKEN_PROVIDER,
  CategoryRepository,
} from '../../domain/repositories/categoryRepository.interface';
import { Inject } from '@nestjs/common';

export class CreateCategoryUseCase {
  constructor(
    @Inject(ILOGGER_TOKEN_PROVIDER) private readonly logger: ILogger,
    @Inject(CATEGORY_REPOSITORY_TOKEN_PROVIDER)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(categoryName: string, userId: string): Promise<CategoryModel> {
    const existentCategories = await this.categoryRepository.findByFilters({
      userId,
      categoryName,
    });

    if (existentCategories && existentCategories.length > 0)
      throw new Error('This category already exists');

    const category = new CategoryModel();
    category.name = categoryName;
    category.userId = userId;

    const created = await this.categoryRepository.insert(category);

    this.logger.log(
      'createCategoryUseCase execute',
      'New category have been inserted',
    );
    return created;
  }
}

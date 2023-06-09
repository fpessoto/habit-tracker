import { CategoryModel } from '../../domain/model/category';
import {
  ILOGGER_TOKEN_PROVIDER,
  ILogger,
} from '../../domain/logger/logger.interface';
import {
  CATEGORY_REPOSITORY_TOKEN_PROVIDER,
  CategoryRepository,
} from '../../domain/repositories/categoryRepository.interface';
import { AddCategoryDto } from '../../infrastructure/controllers/category/category.dto';
import { Inject } from '@nestjs/common';

export class CreateCategoryUseCase {
  constructor(
    @Inject(ILOGGER_TOKEN_PROVIDER) private readonly logger: ILogger,
    @Inject(CATEGORY_REPOSITORY_TOKEN_PROVIDER)
    private readonly categoryRepository: CategoryRepository,
  ) { }

  async execute(
    createCategoryDto: AddCategoryDto,
    userId: string,
  ): Promise<CategoryModel> {
    const category = new CategoryModel();

    category.name = createCategoryDto.name;
    category.userId = userId;

    const result = await this.categoryRepository.insert(category);

    this.logger.log(
      'createCategoryUseCase execute',
      'New category have been inserted',
    );
    return result;
  }
}

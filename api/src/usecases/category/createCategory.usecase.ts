import { CategoryModel } from 'src/domain/model/category';
import { ILogger } from '../../domain/logger/logger.interface';
import { CategoryRepository } from 'src/domain/repositories/categoryRepository.interface';
import { AddCategoryDto } from 'src/infrastructure/controllers/category/category.dto';

export class createCategoryUseCase {
  constructor(
    private readonly logger: ILogger,
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

import { Inject } from '@nestjs/common';
import {
  ILOGGER_TOKEN_PROVIDER,
  ILogger,
} from '../../domain/logger/logger.interface';
import {
  CATEGORY_REPOSITORY_TOKEN_PROVIDER,
  CategoryRepository,
} from '../../domain/repositories/categoryRepository.interface';
import {
  HABIT_REPOSITORY_TOKEN_PROVIDER,
  HabitRepository,
} from '../../domain/repositories/habitRepository.interface';

export class DeleteCategoryUseCase {
  constructor(
    @Inject(ILOGGER_TOKEN_PROVIDER) private readonly logger: ILogger,
    @Inject(CATEGORY_REPOSITORY_TOKEN_PROVIDER)
    private readonly categoryRepository: CategoryRepository,
    @Inject(HABIT_REPOSITORY_TOKEN_PROVIDER)
    private readonly habitRepository: HabitRepository,
  ) {}

  async execute(categoryId: string): Promise<void> {
    const habits = await this.habitRepository.findByCategoryId(categoryId);

    if (habits && habits.length > 0)
      throw new Error(
        'This category has active habits. You need to move the habits to another category',
      );

    await this.categoryRepository.deleteById(categoryId);

    this.logger.log(
      'DeleteCategoryUseCase',
      `category id:${categoryId} deleted with success`,
    );
  }
}

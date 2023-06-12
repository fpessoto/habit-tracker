import { TestBed } from '@automock/jest';
import {
  CATEGORY_REPOSITORY_TOKEN_PROVIDER,
  CategoryRepository,
} from '../../domain/repositories/categoryRepository.interface';
import {
  ILOGGER_TOKEN_PROVIDER,
  ILogger,
} from '../../domain/logger/logger.interface';
import { DeleteCategoryUseCase } from './deleteCategory.usecase';
import {
  HABIT_REPOSITORY_TOKEN_PROVIDER,
  HabitRepository,
} from '../../domain/repositories/habitRepository.interface';
import { CATEGORY_MODEL_MOCK, HABITS_MOCK } from '../../domain/mocks/data';

describe('DeleteCategoryUseCase', () => {
  let underTest: DeleteCategoryUseCase;
  let categoryRepository: jest.Mocked<CategoryRepository>;
  let habitRepository: jest.Mocked<HabitRepository>;
  let logger: jest.Mocked<ILogger>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DeleteCategoryUseCase)
      .mock<ILogger>(ILOGGER_TOKEN_PROVIDER)
      .using({ log: jest.fn() })

      .mock<HabitRepository>(HABIT_REPOSITORY_TOKEN_PROVIDER)
      .using({ findByCategoryId: jest.fn() })

      .mock<CategoryRepository>(CATEGORY_REPOSITORY_TOKEN_PROVIDER)
      .using({ deleteById: jest.fn() })

      .compile();

    underTest = unit;

    categoryRepository = unitRef.get(CATEGORY_REPOSITORY_TOKEN_PROVIDER);
    habitRepository = unitRef.get(HABIT_REPOSITORY_TOKEN_PROVIDER);
    logger = unitRef.get(ILOGGER_TOKEN_PROVIDER);
  });

  it('should be defined', () => {
    expect(underTest).toBeDefined();
  });

  describe('execute', () => {
    it('should delete with success', async () => {
      const categoryId = '1234-abcd';

      await underTest.execute(categoryId);

      expect(categoryRepository.deleteById).toBeCalledTimes(1);
      expect(logger.log).toBeCalledTimes(1);
    });
    it('should return businessException when category has existent habits', async () => {
      // Act
      try {
        habitRepository.findByCategoryId.mockResolvedValue(HABITS_MOCK);

        await underTest.execute(CATEGORY_MODEL_MOCK.id);
        fail('Expected an error to be thrown');
      } catch (error) {
        // Assert
        expect(error.message).toEqual(
          'This category has active habits. You need to move the habits to another category',
        );
        expect(categoryRepository.insert).not.toHaveBeenCalled();
        expect(logger.log).not.toHaveBeenCalled();
      }
    });
  });
});

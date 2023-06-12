import { TestBed } from '@automock/jest';
import { CategoryModel } from '../../domain/model/category';
import {
  CATEGORY_REPOSITORY_TOKEN_PROVIDER,
  CategoryRepository,
} from '../../domain/repositories/categoryRepository.interface';
import {
  ILOGGER_TOKEN_PROVIDER,
  ILogger,
} from '../../domain/logger/logger.interface';
import { UpdateCategoryUseCase } from './updateCategory.usecase';

describe('UpdateCategoryUseCase', () => {
  let underTest: UpdateCategoryUseCase;
  let repository: jest.Mocked<CategoryRepository>;
  let logger: jest.Mocked<ILogger>;

  const VALID_USER_ID = '44c49bf3-bd75-4b04-9603-977be18a823c';
  const CATEGORY_MODEL_MOCK: CategoryModel = {
    id: 'db13a953-6695-41a6-a423-18107bcad336',
    name: 'newCategoryName',
    userId: VALID_USER_ID,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UpdateCategoryUseCase)
      .mock(ILOGGER_TOKEN_PROVIDER)
      .using({ log: jest.fn() })

      .mock(CATEGORY_REPOSITORY_TOKEN_PROVIDER)
      .using({ update: jest.fn() })

      .compile();

    underTest = unit;

    repository = unitRef.get(CATEGORY_REPOSITORY_TOKEN_PROVIDER);
    logger = unitRef.get(ILOGGER_TOKEN_PROVIDER);
  });

  it('should be defined', () => {
    expect(underTest).toBeDefined();
  });

  describe('execute', () => {
    it('should update with success', async () => {
      const updatedCategory = await underTest.execute(
        CATEGORY_MODEL_MOCK.id,
        'newCategoryName',
        VALID_USER_ID,
      );

      expect(repository.updateName).toHaveBeenCalled();
      expect(logger.log).toHaveBeenCalled();
    });
    it('should return businessException when category name already exists', async () => {
      repository.findByFilters.mockResolvedValue([CATEGORY_MODEL_MOCK]);

      // Act
      try {
        await underTest.execute(
          CATEGORY_MODEL_MOCK.id,
          'newCategoryName',
          VALID_USER_ID,
        );
        fail('Expected an error to be thrown');
      } catch (error) {
        // Assert
        expect(error.message).toEqual('This category already exists');
        expect(repository.insert).not.toHaveBeenCalled();
        expect(logger.log).not.toHaveBeenCalled();
      }
    });
  });
});

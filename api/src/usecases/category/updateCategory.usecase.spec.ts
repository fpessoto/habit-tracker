import { TestBed } from '@automock/jest';
import {
  CATEGORY_REPOSITORY_TOKEN_PROVIDER,
  CategoryRepository,
} from '../../domain/repositories/categoryRepository.interface';
import {
  ILOGGER_TOKEN_PROVIDER,
  ILogger,
} from '../../domain/logger/logger.interface';
import { UpdateCategoryUseCase } from './updateCategory.usecase';
import { CATEGORY_MODEL_MOCK, VALID_USER_ID } from '../../domain/mocks/data';

describe('UpdateCategoryUseCase', () => {
  let underTest: UpdateCategoryUseCase;
  let repository: jest.Mocked<CategoryRepository>;
  let logger: jest.Mocked<ILogger>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UpdateCategoryUseCase)
      .mock<ILogger>(ILOGGER_TOKEN_PROVIDER)
      .using({ log: jest.fn() })

      .mock<CategoryRepository>(CATEGORY_REPOSITORY_TOKEN_PROVIDER)
      .using({ updateName: jest.fn() })

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
      await underTest.execute(
        CATEGORY_MODEL_MOCK.id,
        'newCategoryName',
        VALID_USER_ID,
      );

      expect(repository.updateName).toHaveBeenCalled();
      expect(repository.updateName).toHaveBeenCalledWith(
        CATEGORY_MODEL_MOCK.id,
        'newCategoryName',
      );
      expect(logger.log).toHaveBeenCalled();
    });
    it('should return businessException when category name already exists', async () => {
      repository.findByCategoryName.mockResolvedValue([CATEGORY_MODEL_MOCK]);

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

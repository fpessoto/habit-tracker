import { TestBed } from '@automock/jest';
import { CreateCategoryUseCase as CreateCategoryUseCase } from './createCategory.usecase';
import {
  CATEGORY_REPOSITORY_TOKEN_PROVIDER,
  CategoryRepository,
} from '../../domain/repositories/categoryRepository.interface';
import {
  ILOGGER_TOKEN_PROVIDER,
  ILogger,
} from '../../domain/logger/logger.interface';
import { CATEGORY_MODEL_MOCK, VALID_USER_ID } from '../../domain/mocks/data';
import { CategoryModel } from '../../domain/model/category';

describe('createCategoryUseCase', () => {
  let underTest: CreateCategoryUseCase;
  let repository: jest.Mocked<CategoryRepository>;
  let logger: jest.Mocked<ILogger>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(CreateCategoryUseCase)
      .mock<ILogger>(ILOGGER_TOKEN_PROVIDER)
      .using({ log: jest.fn() })

      .mock<CategoryRepository>(CATEGORY_REPOSITORY_TOKEN_PROVIDER)
      .using({ insert: jest.fn() })

      .compile();

    underTest = unit;

    repository = unitRef.get(CATEGORY_REPOSITORY_TOKEN_PROVIDER);
    logger = unitRef.get(ILOGGER_TOKEN_PROVIDER);
  });

  it('should be defined', () => {
    expect(underTest).toBeDefined();
  });

  describe('execute: ', () => {
    it('should create with success', async () => {
      jest
        .spyOn(repository, 'insert')
        .mockImplementation((category: CategoryModel) => {
          category.id = CATEGORY_MODEL_MOCK.id;
          return Promise.resolve(category);
        });

      const createdCategory = await underTest.execute(
        'newCategoryName',
        VALID_USER_ID,
      );

      expect(createdCategory.id).toBe(CATEGORY_MODEL_MOCK.id);
      expect(createdCategory.name).toBe(CATEGORY_MODEL_MOCK.name);
      expect(createdCategory.userId).toBe(CATEGORY_MODEL_MOCK.userId);

      //assert passed values to repository
    });
    it('should return businessException when category name already exists', async () => {
      repository.findByCategoryName.mockResolvedValue([CATEGORY_MODEL_MOCK]);

      // Act
      try {
        await underTest.execute('newCategoryName', VALID_USER_ID);
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

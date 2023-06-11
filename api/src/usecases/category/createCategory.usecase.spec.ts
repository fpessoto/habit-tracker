import { TestBed } from '@automock/jest';
import { CreateCategoryUseCase as CreateCategoryUseCase } from './createCategory.usecase';
import { CategoryModel } from '../../domain/model/category';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { PrismaCategoryRepository } from '../../infrastructure/repositories/category.repository';
import {
  CATEGORY_REPOSITORY_TOKEN_PROVIDER,
  CategoryRepository,
} from '../../domain/repositories/categoryRepository.interface';
import { AddCategoryDto } from '../../infrastructure/controllers/category/category.dto';
import {
  ILOGGER_TOKEN_PROVIDER,
  ILogger,
} from '../../domain/logger/logger.interface';

describe('createCategoryUseCase', () => {
  let underTest: CreateCategoryUseCase;
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
    const { unit, unitRef } = TestBed.create(CreateCategoryUseCase)
      .mock(ILOGGER_TOKEN_PROVIDER)
      .using({ log: jest.fn() })

      .mock(CATEGORY_REPOSITORY_TOKEN_PROVIDER)
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

      const createCategoryDTO: AddCategoryDto = {
        name: 'newCategoryName',
      };

      jest
        .spyOn(repository, 'insert')
        .mockImplementation(async () => CATEGORY_MODEL_MOCK);

      const createdCategory = await underTest.execute(
        createCategoryDTO,
        VALID_USER_ID,
      );

      expect(createdCategory.id).toBe(CATEGORY_MODEL_MOCK.id);
    });
    it('should return businessException when category name already exists', async () => {
      const createCategoryDTO: AddCategoryDto = {
        name: 'newCategoryName',
      };

      repository.findByFilters.mockResolvedValue([CATEGORY_MODEL_MOCK]);

      // Act
      try {
        await underTest.execute(createCategoryDTO, VALID_USER_ID);
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

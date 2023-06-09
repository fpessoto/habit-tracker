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
      const userId = '44c49bf3-bd75-4b04-9603-977be18a823c';
      const createCategoryDTO: AddCategoryDto = {
        name: 'newCategoryName',
      };
      const mockedCategory: CategoryModel = {
        id: 'db13a953-6695-41a6-a423-18107bcad336',
        name: 'newCategoryName',
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(repository, 'insert')
        .mockImplementation(async () => mockedCategory);

      const createdCategory = await underTest.execute(
        createCategoryDTO,
        userId,
      );

      expect(createdCategory.id).toBe(mockedCategory.id);
    });
    it.todo(
      'should return businessException when category name already exists',
    );
  });
});

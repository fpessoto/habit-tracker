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

describe('DeleteCategoryUseCase', () => {
  let underTest: DeleteCategoryUseCase;
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
    const { unit, unitRef } = TestBed.create(DeleteCategoryUseCase)
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

  describe('execute', () => {
    it.todo('should delete with success');
    it.todo(
      'should return businessException when category has existent habits',
    );
  });
});

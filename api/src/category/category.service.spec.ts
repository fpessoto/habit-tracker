import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create: ', () => {
    it.todo('should create with success');
    it.todo(
      'should return businessException when category name already exists',
    );
  });

  describe('update: ', () => {
    it.todo('should update with success');
    it.todo(
      'should return businessException when category name already exists',
    );
  });

  describe('delete: ', () => {
    it.todo('should delete with success');
    it.todo(
      'should return businessException when category has existent habits',
    );
    it.todo('');
  });

  describe('getCategories by userId: ', () => {
    it.todo('should return categories');
    it.todo('should empty array when user doesnt has any categories');
  });
});

import { CategoryModel } from '../model/category';

export interface CategoryRepository {
  insert(category: CategoryModel): Promise<CategoryModel>;
  updateName(id: string, name: string): Promise<void>;
  findAll(): Promise<CategoryModel[]>;
  findById(id: string): Promise<CategoryModel>;
  deleteById(id: string): Promise<void>;
  findByCategoryName({ userId, categoryName }): Promise<CategoryModel[]>;
  findByUserId(userId: string): Promise<CategoryModel[]>;
}

export const CATEGORY_REPOSITORY_TOKEN_PROVIDER = 'CATEGORY_REPOSITORY_TOKEN';

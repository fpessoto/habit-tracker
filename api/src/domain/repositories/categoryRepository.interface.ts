import { CategoryModel } from "../model/category";

export interface CategoryRepository {
  insert(category: CategoryModel): Promise<void>;
  findAll(): Promise<CategoryModel[]>;
  findById(id: string): Promise<CategoryModel>;
  deleteById(id: string): Promise<void>;
}
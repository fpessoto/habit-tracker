import { CategoryModel } from '../model/category';
import { HabitModel } from '../model/habit';

export interface HabitRepository {
  insert(category: HabitModel): Promise<HabitModel>;
  findAll(): Promise<HabitModel[]>;
  findById(id: string): Promise<HabitModel>;
  deleteById(id: string): Promise<void>;
  findByCategoryId(categoryId: string): Promise<HabitModel[]>;
  findByUser(userId: string): Promise<HabitModel[]>;
}

export const HABIT_REPOSITORY_TOKEN_PROVIDER = 'HABIT_REPOSITORY_TOKEN';

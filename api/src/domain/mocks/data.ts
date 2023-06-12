import { CategoryModel } from '../model/category';
import { Frequency, HabitModel } from '../model/habit';

export const VALID_USER_ID = '44c49bf3-bd75-4b04-9603-977be18a823c';

export const CATEGORY_MODEL_MOCK: CategoryModel = {
  id: 'db13a953-6695-41a6-a423-18107bcad336',
  name: 'newCategoryName',
  userId: VALID_USER_ID,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const HABITS_MOCK: HabitModel[] = [
  {
    id: 'b6f471c6-f448-4aac-b7bc-2bd210328460',
    title: 'exercise',
    description: 'I will do the exercise to be healthier',
    userId: VALID_USER_ID,
    createdAt: new Date(),
    updatedAt: new Date(),
    frequency: Frequency.DAILY,
    categoryId: CATEGORY_MODEL_MOCK.id,
  },
];

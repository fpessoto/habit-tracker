export class HabitModel {
  id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  frequency: Frequency;
  categoryId: string;
}

enum Frequency {
  DAILY,
  WEEKLY,
  MONTHLY,
}

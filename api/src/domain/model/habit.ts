export class HabitModel {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly userId: string;
  readonly frequency: Frequency;
  readonly categoryId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(
    id: string,
    title: string,
    description: string,
    userId: string,
    frequency: Frequency,
    categoryId: string,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.frequency = frequency;
    this.categoryId = categoryId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export enum Frequency {
  DAILY,
  WEEKLY,
  MONTHLY,
}

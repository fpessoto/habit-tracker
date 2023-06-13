import {
  ILOGGER_TOKEN_PROVIDER,
  ILogger,
} from '../../domain/logger/logger.interface';
import { Inject } from '@nestjs/common';
import {
  HABIT_REPOSITORY_TOKEN_PROVIDER,
  HabitRepository,
} from '../../domain/repositories/habitRepository.interface';
import { Frequency, HabitModel } from '../../domain/model/habit';

export class CreateHabitUseCase {
  constructor(
    @Inject(ILOGGER_TOKEN_PROVIDER) private readonly logger: ILogger,
    @Inject(HABIT_REPOSITORY_TOKEN_PROVIDER)
    private readonly habitRepository: HabitRepository,
  ) {}

  async execute(
    title: string,
    description: string,
    userId: string,
    frequency: Frequency,
    categoryId: string,
  ): Promise<HabitModel> {
    const newHabit = new HabitModel(
      undefined,
      title,
      description,
      userId,
      frequency,
      categoryId,
    );

    const existentHabits = await this.habitRepository.findByUser(userId);

    if (existentHabits && existentHabits?.filter((h) => h.title == title))
      throw new Error('There is an existent habit with this title');

    const created = await this.habitRepository.insert(newHabit);

    this.logger.log(
      'CreateHabitUseCase execute',
      'New habit have been inserted',
    );
    return created;
  }
}

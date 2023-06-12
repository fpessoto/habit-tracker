import {
  ILOGGER_TOKEN_PROVIDER,
  ILogger,
} from '../../domain/logger/logger.interface';
import { Inject } from '@nestjs/common';
import {
  HABIT_REPOSITORY_TOKEN_PROVIDER,
  HabitRepository,
} from '../../domain/repositories/habitRepository.interface';
import { HabitModel } from '../../domain/model/habit';

export class CreateHabitUseCase {
  constructor(
    @Inject(ILOGGER_TOKEN_PROVIDER) private readonly logger: ILogger,
    @Inject(HABIT_REPOSITORY_TOKEN_PROVIDER)
    private readonly habitRepository: HabitRepository,
  ) {}

  async execute(categoryName: string, userId: string): Promise<HabitModel> {
    this.logger.log(
      'CreateHabitUseCase execute',
      'New habit have been inserted',
    );
    return;
  }
}

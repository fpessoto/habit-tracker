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

export class DeleteHabitUseCase {
  constructor(
    @Inject(ILOGGER_TOKEN_PROVIDER) private readonly logger: ILogger,
    @Inject(HABIT_REPOSITORY_TOKEN_PROVIDER)
    private readonly habitRepository: HabitRepository,
  ) {}

  async execute(habitId: string): Promise<void> {
    this.logger.log('deleteHabitUseCase execute', 'Habit have been deleted');
    return;
  }
}

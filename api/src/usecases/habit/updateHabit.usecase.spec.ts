import { TestBed } from '@automock/jest';
import {
  ILOGGER_TOKEN_PROVIDER,
  ILogger,
} from '../../domain/logger/logger.interface';
import {
  HABIT_REPOSITORY_TOKEN_PROVIDER,
  HabitRepository,
} from '../../domain/repositories/habitRepository.interface';
import { CATEGORY_REPOSITORY_TOKEN_PROVIDER } from '../../domain/repositories/categoryRepository.interface';
import { UpdateHabitUseCase } from './updateHabit.usecase';

describe('updateHabitUseCase', () => {
  let underTest: UpdateHabitUseCase;
  let repository: jest.Mocked<HabitRepository>;
  let logger: jest.Mocked<ILogger>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UpdateHabitUseCase)
      .mock<ILogger>(ILOGGER_TOKEN_PROVIDER)
      .using({ log: jest.fn() })

      .mock<HabitRepository>(HABIT_REPOSITORY_TOKEN_PROVIDER)
      .using({})

      .compile();

    underTest = unit;

    repository = unitRef.get(HABIT_REPOSITORY_TOKEN_PROVIDER);
    logger = unitRef.get(ILOGGER_TOKEN_PROVIDER);
  });

  it('should be defined', () => {
    expect(underTest).toBeDefined();
  });

  describe('execute: ', () => {
    it.todo('should update with success');
    it.todo('should return businessException when habit name already exists');
  });
});

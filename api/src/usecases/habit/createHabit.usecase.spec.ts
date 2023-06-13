import { TestBed } from '@automock/jest';
import {
  ILOGGER_TOKEN_PROVIDER,
  ILogger,
} from '../../domain/logger/logger.interface';
import {
  HABIT_REPOSITORY_TOKEN_PROVIDER,
  HabitRepository,
} from '../../domain/repositories/habitRepository.interface';
import { CreateHabitUseCase } from './createHabit.usecase';
import { HABIT1_MOCK, HABITS_LIST_MOCK } from '../../domain/mocks/data';
import { HabitModel } from '../../domain/model/habit';

describe('createHabitUseCase', () => {
  let underTest: CreateHabitUseCase;
  let repository: jest.Mocked<HabitRepository>;
  let logger: jest.Mocked<ILogger>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(CreateHabitUseCase)
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
    it('should create with success', async () => {
      jest
        .spyOn(repository, 'insert')
        .mockImplementation((habit: HabitModel) => {
          habit = HABIT1_MOCK;
          return Promise.resolve(habit);
        });

      const createdCategory = await underTest.execute(
        HABIT1_MOCK.title,
        HABIT1_MOCK.description,
        HABIT1_MOCK.userId,
        HABIT1_MOCK.frequency,
        HABIT1_MOCK.categoryId,
      );

      expect(createdCategory).toEqual(HABIT1_MOCK);
    });
    it('should return businessException when habit name already exists', async () => {
      repository.findByUser.mockResolvedValue(HABITS_LIST_MOCK);

      // Act
      try {
        await underTest.execute(
          HABIT1_MOCK.title,
          HABIT1_MOCK.description,
          HABIT1_MOCK.userId,
          HABIT1_MOCK.frequency,
          HABIT1_MOCK.categoryId,
        );

        fail('Expected an error to be thrown');
      } catch (error) {
        // Assert
        expect(error.message).toEqual(
          'There is an existent habit with this title',
        );
        expect(repository.insert).not.toHaveBeenCalled();
        expect(logger.log).not.toHaveBeenCalled();
      }
    });
  });
});

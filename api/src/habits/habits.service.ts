import { Injectable } from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { LogHabitDto } from './dto/log-habit.dto';
import { Habit, HabitLog } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/config/prisma/prisma.service';

@Injectable()
export class HabitsService {
  constructor(private readonly prisma: PrismaService) {}

  async createHabit(createHabitDto: CreateHabitDto): Promise<Habit> {
    const { title, description, frequency, userId, categoryId } =
      createHabitDto;

    return this.prisma.habit.create({
      data: {
        title,
        description,
        frequency,
        userId,
        categoryId,
      },
    });
  }

  async updateHabit(
    habitId: string,
    updateHabitDto: UpdateHabitDto,
  ): Promise<Habit> {
    const { title, description, frequency } = updateHabitDto;
    return this.prisma.habit.update({
      where: { id: habitId },
      data: { title, description, frequency },
    });
  }

  async deleteHabit(habitId: string): Promise<Habit> {
    return this.prisma.habit.delete({
      where: { id: habitId },
    });
  }

  async getHabitsbyUserId(userId: string): Promise<Habit[]> {
    return this.prisma.habit.findMany();
  }

  async getHabit(habitId: string): Promise<Habit> {
    return this.prisma.habit.findUnique({
      where: { id: habitId },
    });
  }

  async logHabit(habitId: string, logHabitDto: LogHabitDto): Promise<HabitLog> {
    const { loggedAt } = logHabitDto;
    return this.prisma.habitLog.create({
      data: {
        habitId: habitId,
        loggedAt,
      },
    });
  }

  unlogHabit(logId: string) {
    throw new Error('Method not implemented.');
  }

  async getHabitLogs(habitId: string): Promise<HabitLog[]> {
    return this.prisma.habitLog.findMany({
      where: { habitId: habitId },
    });
  }
}

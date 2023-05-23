// HabitController.ts

import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Get,
  Param,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { LogHabitDto } from './dto/log-habit.dto';
import { User } from 'src/auth/decorators/user.decorator';

@Controller('api/habits')
export class HabitsController {
  constructor(private readonly habitService: HabitsService) { }

  @Post()
  async createHabit(@Body() createHabitDto: CreateHabitDto) {
    return this.habitService.createHabit(createHabitDto);
  }

  @Put(':habit_id')
  async updateHabit(
    @Param('habit_id') habitId: string,
    @Body() updateHabitDto: UpdateHabitDto,
  ) {
    return this.habitService.updateHabit(habitId, updateHabitDto);
  }

  @Delete(':habit_id')
  async deleteHabit(@Param('habit_id') habitId: string) {
    return this.habitService.deleteHabit(habitId);
  }

  @Get()
  async getHabits(@User() user) {
    return this.habitService.getHabitsbyUserId(user.id);
  }

  @Get(':habit_id')
  async getHabit(@Param('habit_id') habitId: string) {
    return this.habitService.getHabit(habitId);
  }

  @Post(':habit_id/log')
  async logHabit(
    @Param('habit_id') habitId: string,
    @Body() logHabitDto: LogHabitDto,
  ) {
    return this.habitService.logHabit(habitId, logHabitDto);
  }

  @Get(':habit_id/log')
  async getHabitLogs(@Param('habit_id') habitId: string) {
    return this.habitService.getHabitLogs(habitId);
  }

  @Delete('/log/:log_id')
  async unlogHabit(
    @Param('log_id') logId: string,
  ) {
    return this.habitService.unlogHabit(logId);
  }
}

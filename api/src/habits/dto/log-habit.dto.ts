// LogHabitDto.ts

import { IsNotEmpty } from 'class-validator';

export class LogHabitDto {
  @IsNotEmpty()
  loggedAt: Date;
}

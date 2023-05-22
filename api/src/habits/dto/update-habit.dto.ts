// UpdateHabitDto.ts

import { IsNotEmpty, IsEnum } from 'class-validator';
import { Frequency } from '../enums/frequency.enum';

export class UpdateHabitDto {
  @IsNotEmpty()
  title: string;

  description: string;

  @IsNotEmpty()
  @IsEnum(Frequency)
  frequency: Frequency;
}

// CreateHabitDto.ts

import { IsNotEmpty, IsEnum, IsUUID } from 'class-validator';
import { Frequency } from '../enums/frequency.enum';

export class CreateHabitDto {
  @IsNotEmpty()
  title: string;

  description: string;

  @IsNotEmpty()
  @IsEnum(Frequency)
  frequency: Frequency;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}

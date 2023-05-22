// AuthTokenDto.ts

import { IsNotEmpty } from 'class-validator';

export class AuthTokenDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

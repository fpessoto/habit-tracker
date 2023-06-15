import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class LoginUseCase {
  constructor() {}

  async execute(user: any) {}
}

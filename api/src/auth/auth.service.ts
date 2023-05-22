// AuthService.ts

import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { AuthTokenDto } from './dto/auth-token.dto';
import { PrismaService } from 'src/prisma/prisma.service';

const SECRET_KEY = 'your-secret-key'; // Replace with your own secret key

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async getAuthToken(authTokenDto: AuthTokenDto): Promise<string> {
    const { username, password } = authTokenDto;
    // const user = await this.prisma.user.findUnique({ where: { username } });
    // if (!user || user.password !== password) {
    //   throw new Error('Invalid credentials');
    // }
    // const token = jwt.sign({ userId: user.id }, SECRET_KEY);
    return '';
  }
}

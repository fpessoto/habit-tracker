import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/infrastructure/config/prisma/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;
    return this.prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.prisma.user.findFirst({
      where: { AND: { username: username } },
    });
  }
}

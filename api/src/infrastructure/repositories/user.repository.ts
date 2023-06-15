import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserModel } from '../../domain/model/user.model';
import { User } from '@prisma/client';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneByUserName(username: string): Promise<UserModel> {
    const user = await this.prisma.user.findFirst({
      where: { AND: { username: username } },
    });

    return this.toModel(user);
  }

  private toEntity(model: UserModel): User {
    const entity: User = {
      id: model.id,
      username: model.username,
      email: model.email,
      password: model.password,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    return entity;
  }

  private toModel(prismaType: User): UserModel {
    const model = new UserModel();

    model.id = prismaType.id;
    model.username = prismaType.username;
    model.email = prismaType.email;
    model.password = prismaType.password;
    model.createdAt = prismaType.createdAt;
    model.updatedAt = prismaType.updatedAt;

    return model;
  }
}

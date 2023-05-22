import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HabitsModule } from './habits/habits.module';
import { AuthModule } from './auth/auth.module';
import { HabitsController } from './habits/habits.controller';
import { AuthController } from './auth/auth.controller';
import { CategoryService } from './category/category.service';
import { UserService } from './user/user.service';
import { CategoryController } from './category/category.controller';
import { UserController } from './user/user.controller';
import { HabitsService } from './habits/habits.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [PrismaModule, HabitsModule, AuthModule, HabitsModule],
  controllers: [
    AppController,
    AuthController,
    CategoryController,
    UserController,
    HabitsController,
  ],
  providers: [
    AppService,
    PrismaService,
    CategoryService,
    UserService,
    HabitsService,
    AuthService,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';
import { AuthModule } from './auth/auth.module';
import { HabitsController } from './habits/habits.controller';
import { AuthController } from './auth/auth.controller';
import { CategoryService } from './category/category.service';
import { UserService } from './user/user.service';
import { CategoryController } from './category/category.controller';
import { UserController } from './user/user.controller';
import { HabitsService } from './habits/habits.service';
import { AuthService } from './auth/auth.service';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { PrismaConfigModule } from './infrastructure/config/prisma/prisma.module';
import { PrismaService } from './infrastructure/config/prisma/prisma.service';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsService } from './infrastructure/exceptions/exceptions.service';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { CategoryModule } from './infrastructure/controllers/category/category.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';

@Module({
  imports: [PrismaConfigModule, HabitsModule, AuthModule, HabitsModule, EnvironmentConfigModule, LoggerModule, ExceptionsModule, RepositoriesModule, UsecasesProxyModule, CategoryModule, ControllersModule],
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
    ExceptionsService,
  ],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { CategoryController } from './category/category.controller';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [AuthController, CategoryController],
})
export class ControllersModule {}

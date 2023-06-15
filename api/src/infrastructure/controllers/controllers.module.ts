import { Module } from '@nestjs/common';
import { CategoryController } from './category/category.controller';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [CategoryController],
})
export class ControllersModule {}

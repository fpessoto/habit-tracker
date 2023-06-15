import { Module } from '@nestjs/common';
import { PrismaConfigModule } from '../config/prisma/prisma.module';
import { PrismaCategoryRepository } from './category.repository';
import { PrismaUserRepository } from './user.repository';

@Module({
  imports: [PrismaConfigModule],
  providers: [PrismaCategoryRepository, PrismaUserRepository],
  exports: [PrismaCategoryRepository, PrismaUserRepository],
})
export class RepositoriesModule {}

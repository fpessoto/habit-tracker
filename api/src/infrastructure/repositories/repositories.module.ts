import { Module } from '@nestjs/common';
import { PrismaConfigModule } from '../config/prisma/prisma.module';
import { PrismaCategoryRepository } from './category.repository';

@Module({
  imports: [PrismaConfigModule],
  providers: [PrismaCategoryRepository],
  exports: [PrismaCategoryRepository],
})
export class RepositoriesModule { }

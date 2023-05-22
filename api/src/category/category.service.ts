// CategoryService.ts

import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name } = createCategoryDto;
    return this.prisma.category.create({
      data: {
        name,
      },
    });
  }

  async updateCategory(
    categoryId: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const { name } = updateCategoryDto;
    return this.prisma.category.update({
      where: { id: categoryId },
      data: { name },
    });
  }

  async deleteCategory(categoryId: string): Promise<Category> {
    return this.prisma.category.delete({
      where: { id: categoryId },
    });
  }

  async getCategories(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }
}
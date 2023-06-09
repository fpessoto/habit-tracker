import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/infrastructure/config/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) { }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    userId: string,
  ): Promise<Category> {
    const { name } = createCategoryDto;
    const createdCategory = this.prisma.category.create({
      data: {
        name,
        userId,
      },
    });

    return createdCategory;
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

  async getCategories(userId: string): Promise<Category[]> {
    const categories = this.prisma.category.findMany({
      where: { userId },
    });

    console.log('response', { categories, userId });

    return categories;
  }
}

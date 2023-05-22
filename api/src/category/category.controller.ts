// CategoryController.ts

import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Get,
  Param,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/auth/decorators/user.decorator';

@ApiBearerAuth()
@Controller('api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto, @User() user) {
    return this.categoryService.createCategory(createCategoryDto, user.id);
  }

  @Put(':category_id')
  async updateCategory(
    @Param('category_id') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(categoryId, updateCategoryDto);
  }

  @Delete(':category_id')
  async deleteCategory(@Param('category_id') categoryId: string) {
    return this.categoryService.deleteCategory(categoryId);
  }

  @Get()
  async getCategories(@User() user) {
    console.log('get category', user);

    return this.categoryService.getCategories(user.id);
  }
}

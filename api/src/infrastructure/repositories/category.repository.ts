import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CategoryModel } from '../../domain/model/category';
import { CategoryRepository } from '../../domain/repositories/categoryRepository.interface';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaService) { }

  async insert(category: CategoryModel): Promise<CategoryModel> {
    const { name, userId } = category;

    const createdCategory = await this.prisma.category.create({
      data: {
        name,
        userId,
      },
    });

    const createdModel: CategoryModel = this.toModel(createdCategory);

    return createdModel;
  }
  findAll(): Promise<CategoryModel[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<CategoryModel> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private toEntity(model: CategoryModel): Category {
    const entity: Category = {
      id: model.id,
      name: model.name,
      userId: model.userId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    return entity;
  }

  private toModel(prismaType: Category): CategoryModel {
    const model = new CategoryModel();

    model.id = prismaType.id;
    model.name = prismaType.name;
    model.userId = prismaType.userId;
    model.createdAt = prismaType.createdAt;
    model.updatedAt = prismaType.updatedAt;

    return model;
  }
}

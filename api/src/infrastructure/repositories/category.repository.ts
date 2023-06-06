import { Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";
import { CategoryModel } from "src/domain/model/category";
import { CategoryRepository } from "src/domain/repositories/categoryRepository.interface";

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  insert(category: CategoryModel): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<CategoryModel[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<CategoryModel> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private toModel(entity: Category): CategoryModel {
    const model = new CategoryModel();

    return model
  }


  private toEntity(model: CategoryModel): Category {

    const entity: Category = {
      id: model.id,
      name: model.name,
      userId: model.userId,
      createdAt: model.createAt,
      updatedAt: model.updateAt,
    };

    return entity
  }

}
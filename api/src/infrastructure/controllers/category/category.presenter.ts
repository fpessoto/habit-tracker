import { ApiProperty } from '@nestjs/swagger';
import { CategoryModel } from '../../../domain/model/category';

export class CategoryPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;

  constructor(model: CategoryModel) {
    this.id = model.id;
    this.name = model.name;
  }
}

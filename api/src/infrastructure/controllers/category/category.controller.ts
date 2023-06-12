import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiExtraModels } from '@nestjs/swagger';
import { AddCategoryDto } from './category.dto';
import { CategoryPresenter } from './category.presenter';
import { User } from '../../../auth/decorators/user.decorator';
import { CREATE_CATEGORY_USECASES_PROXY } from '../../usecases-proxy/usecases-proxy.module';
import { CreateCategoryUseCase } from '../../../usecases/category/createCategory.usecase';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';

@Controller('category')
@ApiTags('category')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(CategoryPresenter)
export class CategoryController {
  constructor(
    @Inject(CREATE_CATEGORY_USECASES_PROXY)
    private readonly createCategoryUsecaseProxy: UseCaseProxy<CreateCategoryUseCase>,
  ) {}

  @Post('category')
  @ApiResponse({ type: CategoryPresenter })
  async addCategory(@Body() addCategoryDto: AddCategoryDto, @User() user) {
    const categoryCreated = await this.createCategoryUsecaseProxy
      .getInstance()
      .execute(addCategoryDto.name, user.id);
    return new CategoryPresenter(categoryCreated);
  }
}

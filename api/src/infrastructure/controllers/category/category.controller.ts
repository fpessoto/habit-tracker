import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiExtraModels } from '@nestjs/swagger';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { CreateCategoryUseCase } from 'src/usecases/category/createCategory.usecase';
import { AddCategoryDto } from './category.dto';
import { CategoryPresenter } from './category.presenter';
import { User } from 'src/auth/decorators/user.decorator';

@Controller('category')
@ApiTags('category')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(CategoryPresenter)
export class CategoryController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_CATEGORY_USECASES_PROXY)
    private readonly createCategoryUsecaseProxy: UseCaseProxy<CreateCategoryUseCase>,
  ) {}

  @Post('category')
  @ApiResponse({ type: CategoryPresenter })
  async addCategory(@Body() addCategoryDto: AddCategoryDto, @User() user) {
    const categoryCreated = await this.createCategoryUsecaseProxy
      .getInstance()
      .execute(addCategoryDto, user.id);
    return new CategoryPresenter(categoryCreated);
  }
}

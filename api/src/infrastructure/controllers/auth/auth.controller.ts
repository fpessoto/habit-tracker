import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LOGIN_USECASES_PROXY } from '../../usecases-proxy/usecases-proxy.module';
import { LoginUseCase } from '../../../usecases/auth/login.usecase';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { Public } from '../../common/decorators/public.decorator';
import { LogoutUseCase } from '../../../usecases/auth/logout.usecase';
import { IsAuthenticatedUseCase } from '../../../usecases/auth/isAuthenticated.usecase';
import { LoginGuard } from '../../common/guards/login.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCase>,
  ) {}

  // @UseGuards(LocalAuthGuard)
  @UseGuards(LoginGuard)
  @ApiBearerAuth()
  @Post('login')
  async login(@Body() req) {
    const response = await this.loginUsecaseProxy
      .getInstance()
      .execute(req.username, req.password);

    return response;
  }

  // @Post('logout')
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ description: 'logout' })
  // async logout(@Request() request: any) {
  //   const cookie = await this.logoutUsecaseProxy.getInstance().execute();
  //   request.res.setHeader('Set-Cookie', cookie);
  //   return 'Logout successful';
  // }

  // @Get('is_authenticated')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ description: 'is_authenticated' })
  // async isAuthenticated(@Req() request: any) {
  //   const user = await this.isAuthUsecaseProxy
  //     .getInstance()
  //     .execute(request.user.username);
  //   const response = new IsAuthPresenter();
  //   response.username = user.username;
  //   return response;
  // }

  // @Get('refresh')
  // @UseGuards(JwtRefreshGuard)
  // @ApiBearerAuth()
  // async refresh(@Req() request: any) {
  //   const accessTokenCookie = await this.loginUsecaseProxy
  //     .getInstance()
  //     .getCookieWithJwtToken(request.user.username);
  //   request.res.setHeader('Set-Cookie', accessTokenCookie);
  //   return 'Refresh successful';
  // }
}

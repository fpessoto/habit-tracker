import {
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import {
  LOGIN_USECASES_PROXY,
  UsecasesProxyModule,
} from '../../usecases-proxy/usecases-proxy.module';
import { LoginUseCase } from '../../../usecases/auth/login.usecase';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { LocalAuthGuard } from '../../../auth/local-auth.guard';
import { Public } from '../../../auth/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCase>,
    @Inject(LOGOUT_USECASES_PROXY)
    private readonly logoutUsecaseProxy: UseCaseProxy<LogoutUseCase>,
    @Inject(IS_AUTHENTICATED_USECASES_PROXY)
    private readonly isAuthUsecaseProxy: UseCaseProxy<IsAuthenticatedUseCase>,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'logout' })
  async logout(@Request() request: any) {
    const cookie = await this.logoutUsecaseProxy.getInstance().execute();
    request.res.setHeader('Set-Cookie', cookie);
    return 'Logout successful';
  }

  @Get('is_authenticated')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'is_authenticated' })
  async isAuthenticated(@Req() request: any) {
    const user = await this.isAuthUsecaseProxy
      .getInstance()
      .execute(request.user.username);
    const response = new IsAuthPresenter();
    response.username = user.username;
    return response;
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  async refresh(@Req() request: any) {
    const accessTokenCookie = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtToken(request.user.username);
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return 'Refresh successful';
  }
}

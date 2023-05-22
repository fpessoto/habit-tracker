// AuthController.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthTokenDto } from './dto/auth-token.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  async getAuthToken(@Body() authTokenDto: AuthTokenDto) {
    return this.authService.getAuthToken(authTokenDto);
  }

  @Post('logout')
  async logout() {
    // Logic for user logout
  }
}

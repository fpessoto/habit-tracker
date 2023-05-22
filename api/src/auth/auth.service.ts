// AuthService.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthTokenDto } from './dto/auth-token.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

const SECRET_KEY = 'your-secret-key'; // Replace with your own secret key

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  async getAuthToken(authTokenDto: AuthTokenDto): Promise<string> {
    const { username, password } = authTokenDto;
    // const user = await this.prisma.user.findUnique({ where: { username } });
    // if (!user || user.password !== password) {
    //   throw new Error('Invalid credentials');
    // }
    // const token = jwt.sign({ userId: user.id }, SECRET_KEY);
    return '';
  }

  async signIn(username, pass) {
    const user = await this.usersService.findOne(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

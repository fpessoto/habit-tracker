import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  USER_REPOSITORY_TOKEN_PROVIDER,
  UserRepository,
} from '../../domain/repositories/user.repository';
import { UserModel } from '../../domain/model/user.model';
import {
  IJwtService,
  IJwtServicePayload,
  JWT_SERVICE_TOKEN_PROVIDER,
} from '../../domain/adapters/jwt-service.interface';
import {
  JWTConfig,
  JWT_CONFIG_TOKEN as JWT_CONFIG_TOKEN_PROVIDER,
} from '../../domain/config/jwt-config.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(JWT_SERVICE_TOKEN_PROVIDER)
    private readonly jwtService: IJwtService,
    @Inject(JWT_CONFIG_TOKEN_PROVIDER) private readonly jwtConfig: JWTConfig,
    @Inject(USER_REPOSITORY_TOKEN_PROVIDER)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneByUserName(username);
    if (!user) {
      throwInvalidUserException();
    }

    if (this.verifyMathPassword(user, password)) {
      return this.createToken(user);
    }

    throwInvalidUserException();

    function throwInvalidUserException() {
      throw new UnauthorizedException('username or password invalid');
    }
  }

  private verifyMathPassword(user: UserModel, password: string) {
    //TODO: add encrypt
    return user.password === password;
  }

  async createToken(user: UserModel): Promise<any> {
    const payload: IJwtServicePayload = { username: user.username };

    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
    const token = this.jwtService.createToken(payload, secret, expiresIn);

    return { access_token: token };
  }
}

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
import {
  BCRIPT_SERVICE_TOKEN_PROVIDER,
  IBcryptService,
} from '../../domain/adapters/bcrypt.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(JWT_SERVICE_TOKEN_PROVIDER)
    private readonly jwtService: IJwtService,
    @Inject(JWT_CONFIG_TOKEN_PROVIDER) private readonly jwtConfig: JWTConfig,
    @Inject(USER_REPOSITORY_TOKEN_PROVIDER)
    private readonly userRepository: UserRepository,
    @Inject(BCRIPT_SERVICE_TOKEN_PROVIDER)
    private readonly bcryptService: IBcryptService,
  ) {}

  async execute(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneByUserName(username);
    if (!user) {
      throwInvalidUserException();
    }

    const hashed = await this.bcryptService.hash(password);

    const match = await this.bcryptService.compare(password, user.password);
    if (user && match) {
      return this.createToken(user);
    }

    throwInvalidUserException();

    function throwInvalidUserException() {
      throw new UnauthorizedException('username or password invalid');
    }
  }

  async validateUserForJWTStragtegy(username: string) {
    const user = await this.userRepository.findOneByUserName(username);
    if (!user) {
      return null;
    }
    return user;
  }

  async updateLoginTime(username: string) {
    await this.userRepository.updateLastLogin(username);
  }

  async setCurrentRefreshToken(refreshToken: string, username: string) {
    const currentHashedRefreshToken = await this.bcryptService.hash(
      refreshToken,
    );
    await this.userRepository.updateRefreshToken(
      username,
      currentHashedRefreshToken,
    );
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, username: string) {
    const user = await this.userRepository.findOneByUserName(username);
    if (!user) {
      return null;
    }

    const isRefreshTokenMatching = await this.bcryptService.compare(
      refreshToken,
      user.hashRefreshToken,
    );
    if (isRefreshTokenMatching) {
      return user;
    }

    return null;
  }

  private async createToken(user: UserModel): Promise<any> {
    const payload: IJwtServicePayload = { username: user.username };

    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
    const token = this.jwtService.createToken(payload, secret, expiresIn);

    return { access_token: token };
  }
}

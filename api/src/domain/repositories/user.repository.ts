import { UserModel } from '../model/user.model';

export interface UserRepository {
  updateRefreshToken(
    username: string,
    currentHashedRefreshToken: string,
  ): Promise<void>;
  updateLastLogin(username: string): Promise<void>;
  findOneByUserName(username: string): Promise<UserModel>;
}

export const USER_REPOSITORY_TOKEN_PROVIDER = 'USER_REPOSITORY_TOKEN';

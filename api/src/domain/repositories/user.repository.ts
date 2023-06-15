import { UserModel } from '../model/user.model';

export interface UserRepository {
  findOneByUserName(username: string): Promise<UserModel>;
}

export const USER_REPOSITORY_TOKEN_PROVIDER = 'USER_REPOSITORY_TOKEN';

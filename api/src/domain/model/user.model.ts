export class UserModel {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  hashRefreshToken: string;
}

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login: ', () => {
    it.todo('should get the token with success');
    it.todo('should get Unauthorized when invalid request');
  });

  describe('profile: ', () => {
    it.todo('should get the user profile');
    it.todo('should get Unauthorized when invalid token');
  });

});

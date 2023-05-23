import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser: ', () => {
    it.todo('should return user');
    it.todo('should return "null" when invalid user');
  });

  describe('login: ', () => {
    it.todo('should get the token access_token');
    it.todo('should get some error when invalid user');
  });
});

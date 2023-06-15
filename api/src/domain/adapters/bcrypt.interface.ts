export interface IBcryptService {
  hash(hashString: string): Promise<string>;
  compare(password: string, hashPassword: string): Promise<boolean>;
}

export const BCRIPT_SERVICE_TOKEN_PROVIDER = 'BCRIPT_SERVICE_TOKEN_PROVIDER';

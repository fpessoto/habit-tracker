export interface IJwtServicePayload {
  username: string;
}

export interface IJwtService {
  checkToken(token: string): Promise<any>;
  createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string,
  ): string;
}

export const JWT_SERVICE_TOKEN_PROVIDER = 'JWT_SERVICE_TOKEN';

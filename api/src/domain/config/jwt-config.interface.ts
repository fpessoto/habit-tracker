export interface JWTConfig {
  getJwtSecret(): string;
  getJwtExpirationTime(): string;
  getJwtRefreshSecret(): string;
  getJwtRefreshExpirationTime(): string;
}

export const JWT_CONFIG_TOKEN = 'JWT_CONFIG_TOKEN';

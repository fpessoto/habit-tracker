import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: async (config: EnvironmentConfigService) => {
        return {
          prismaOptions: {
            datasources: {
              db: {
                url: config.getDatabaseURL(),
              },
            },
          },
        };
      },
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
    }),
  ],
})
//todo configure prisma module
export class PrismaConfigModule {}

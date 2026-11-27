import { DynamicModule, Module } from '@nestjs/common';
import { DATABASE_URL, DatabaseService } from './health/database.service';
import { HealthController } from './health/health.controller';

export interface AppModuleOptions {
  databaseUrl: string;
}

@Module({})
export class AppModule {
  static register(options: AppModuleOptions): DynamicModule {
    return {
      module: AppModule,
      controllers: [HealthController],
      providers: [{ provide: DATABASE_URL, useValue: options.databaseUrl }, DatabaseService],
    };
  }
}

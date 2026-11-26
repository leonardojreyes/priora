import { Controller, Get, Inject, ServiceUnavailableException } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiProperty,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { version } from '../version';
import { DatabaseService } from './database.service';

export class HealthDto {
  @ApiProperty({ type: String, enum: ['ok', 'error'] })
  status!: 'ok' | 'error';

  @ApiProperty({ type: String, example: '0.0.0' })
  version!: string;

  @ApiProperty({ type: String, enum: ['up', 'down'] })
  db!: 'up' | 'down';
}

@ApiTags('sistema')
@Controller('health')
export class HealthController {
  constructor(@Inject(DatabaseService) private readonly database: DatabaseService) {}

  @Get()
  @ApiOkResponse({ type: HealthDto, description: 'El servicio y la base de datos responden' })
  @ApiServiceUnavailableResponse({ type: HealthDto, description: 'La base de datos no responde' })
  async comprobar(): Promise<HealthDto> {
    if (await this.database.estaDisponible()) return { status: 'ok', version, db: 'up' };
    throw new ServiceUnavailableException({ status: 'error', version, db: 'down' });
  }
}

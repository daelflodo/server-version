import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({});
const configService = new ConfigService
// Obtén el nombre de la migración del segundo argumento pasado al script o usa uno predeterminado
const migrationName = process.argv[3] || 'unnamed_migration';
export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
  synchronize: true,
  migrationsRun: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDs = new DataSource(dataSourceConfig);



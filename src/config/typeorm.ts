// src/config/typeorm.config.ts
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeormConfig = () => ({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root@123',
  database: 'nestjs',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  synchronize: false,
});

// Export the AppDataSource instance as well for direct use
export const AppDataSource = new DataSource(
  typeormConfig() as DataSourceOptions,
);

// src/config/typeorm.config.ts
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeormConfig = () => ({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root@123',
  database: process.env.DB_NAME || 'nestjs',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  synchronize: false,
});

// Export the AppDataSource instance as well for direct use
export const AppDataSource = new DataSource(
  typeormConfig() as DataSourceOptions,
);

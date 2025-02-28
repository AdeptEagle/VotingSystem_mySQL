import { DataSource } from 'typeorm';
import { User } from './user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'mydatabase',
  entities: [User],
  synchronize: true, // Ensures tables are created automatically
  logging: true,
});

AppDataSource.initialize()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));
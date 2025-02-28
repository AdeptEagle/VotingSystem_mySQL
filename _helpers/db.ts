 import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'mysql', 
  host: 'localhost',
  port: 4000,
  username: 'your_username', 
  password: 'your_password', 
  database: 'your_database', 
  synchronize: true,
  logging: false,
  entities: [
    'entities/User',  // Replace with your entity paths
    'entities/Poll',
    'entities/Option',
    'entities/Vote',
  ],
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established.');
  } catch (error) {
    console.error('Database connection error:', error);
    //process.exit(1);
  }
};
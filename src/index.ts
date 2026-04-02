import express from 'express';
import routes from '@/routes';
import { errorHandler } from './middlewares/error.middleware';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
// connect database
// const connectDatabase = async () => {
//   try {
//     await db.execute(`SELECT 1`); // Simple query to test connection
//     console.log('Database connected successfully');
//   } catch (error) {
//     console.error('Database connection failed:', error);
//   }
// };

// connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1', routes);

app.use(errorHandler);

export default app;

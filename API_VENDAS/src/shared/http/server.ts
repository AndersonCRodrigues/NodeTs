import 'reflect-metadata';
import express, { Request, Response } from 'express';
import cors from 'cors';

import routes from './routes';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

// middleware
app.use((error: Error, req: Request, res: Response) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }

  return res
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

app.listen(5000, () => {
  console.log('Server rodando em: http://localhost:5000');
});

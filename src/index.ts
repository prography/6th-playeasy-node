import 'reflect-metadata';
import dotenv from 'dotenv';
import { app } from './app';

dotenv.config();

const HOST = process.env.HOST || 'localhost';
const PORT = Number(process.env.PORT || 3000);

const startApplication = async () => {
  app.listen(PORT, HOST, () => {
    console.log(`server is running on ${HOST}:${PORT}`);
  });
};

startApplication();
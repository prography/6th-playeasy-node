import 'reflect-metadata';
import dotenv from 'dotenv';
import { app } from './app';

dotenv.config();

//const HOST = process.env.HOST || 'localhost';
const PORT = Number(process.env.PORT || 3000);

const startApplication = async () => {
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT} port`);
  });
};

startApplication();
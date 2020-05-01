import dotenv from 'dotenv';
import { app } from './app';

dotenv.config();

app.listen(3000, () => {
  console.log(`server is running on ${3000}`);
});
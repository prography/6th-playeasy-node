import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { useExpressServer } from 'routing-controllers';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';

// 데이터베이스 연결
createConnection()
  .then(() => {
    console.log('database connected');
  })
  .catch((error) => console.error(error));
  
const app = express();

dotenv.config();

// 소셜 로그인 테스트를 위한 템플릿 엔진 사용
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

useExpressServer(app, {
  routePrefix: "/api",
  cors: true,
  controllers: [`${__dirname}/controllers/**`],
  middlewares: [`${__dirname}/middlewares/**`],
  });


export {
    app,
}
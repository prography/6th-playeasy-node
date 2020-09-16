import 'reflect-metadata';
import express from 'express';
import { createDatabaseConnection } from './db';
import { useExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
  
const app = express();

dotenv.config();

// 데이터베이스 연결
createDatabaseConnection()
  .then(() => {
    console.log('database connected');
  })
  .catch((error) => console.error(error));

// 소셜 로그인 테스트를 위한 템플릿 엔진 사용
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// 미들웨어
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

// 의존성 관리
useContainer(Container);

// routing-controller
useExpressServer(app, {
  routePrefix: "/api",
  cors: true,
  controllers: [`${__dirname}/controller/**`],
  middlewares: [`${__dirname}/middlewares/**`],
  });

export {
    app,
}
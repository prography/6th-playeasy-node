import 'reflect-metadata';
import express from 'express';
import { createDatabaseConnection } from './utils/DatabaseConnector';
import { useExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import * as sentry from '@sentry/node';

const app = express();

dotenv.config();

// 데이터베이스 연결
createDatabaseConnection()
  .then(() => {
    console.log('database connected');
  })
  .catch((error) => console.error(error));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

// 미들웨어
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  sentry.init({ dsn: process.env.SENTRY_DNS });
  app.use(sentry.Handlers.requestHandler());
  app.use(sentry.Handlers.errorHandler());
} else { 
  app.use(morgan('dev'));
}

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
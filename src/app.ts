import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import { createDatabaseConnection } from './util/DatabaseConnector';
import { useExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { currentUserChecker } from './util/Authorization';  

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
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
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
  currentUserChecker,
});

// // 404 미들웨어
// app.use(function(req: Request, res: Response, next: NextFunction) {
//   const err = new Error('Not Found');
//   res.status(404);
//   next(err);
// });

export {
    app,
}
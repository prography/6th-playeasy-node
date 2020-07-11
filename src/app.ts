import 'reflect-metadata';
import express, { Request } from 'express';
import { useExpressServer } from 'routing-controllers';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import * as Sentry from '@sentry/node';

Sentry.init({ dsn: process.env.SENTRY_DSN });
const app = express();

dotenv.config();

app.use(Sentry.Handlers.requestHandler());

// 테스트 후 삭제 예정
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

app.use(Sentry.Handlers.errorHandler());

app.use(function onError(_: any , __: Request, res: any, next: any) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});


export {
    app,
}


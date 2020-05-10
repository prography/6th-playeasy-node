import express from 'express';
import { useExpressServer } from 'routing-controllers';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

useExpressServer(app, {
  routePrefix: "/api",
  cors: true,
  controllers: [`${__dirname}/controllers/**`],
  });


export {
    app,
}
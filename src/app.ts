import express from 'express';
import session from 'express-session';
import path from 'path';
import { config } from 'dotenv';
import logger from 'morgan';
import passport from 'passport';
import { useExpressServer } from 'routing-controllers';

const app = express();

config();


app.use(logger('dev'));
app.use(passport.initialize());

useExpressServer(app, {
    controllers: [`${__dirname}/controllers/**`],
  });
  
export {
    app,
}
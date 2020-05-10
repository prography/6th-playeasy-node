import { BaseController } from './BaseController';
import { JsonController, Get, Post, Param, } from 'routing-controllers';
import { PrismaClient } from '@prisma/client';
import 'passport';
import 'passport-kakao';


const passport = require('passport');
const KakaoStrategy = require("passport-kakao").Strategy;

const kakaoKey = {
  clientID: "794ed9a88648a25cbaec8bc25ad4f2a6",
  clientSecret: "RErwx7dT3qqUIKXsil9DuMcLk4w2HV2d",
  callbackURL: "http://localhost:3000/login/kakao/callback"
};


passport.use(
    new KakaoStrategy(kakaoKey, (accessToken: any, refreshToken: any, profile: any, done: any) => {
      console.log(profile);
    })
  );
  
@JsonController('/auth')
export class AuthController extends BaseController {
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    @Get('/kakao')
    public kakaoCheck() {
        console.log('good');
        passport.authenticate("kakao", {
            successRedirect: "/",
            failureRedirect: "/api/auth/fail"
        });
    }

    @Get('/kakao/callback')
    public kakaoResult() {
        return passport.authenticate("kakao", {
            successRedirect: "/",
            failureRedirect: "/api/auth/fail"
          })
    }
}
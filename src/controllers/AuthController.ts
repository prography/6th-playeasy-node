import { BaseController } from './BaseController';
import { JsonController, Get, Post, BodyParam, CookieParam , 
        UseBefore, Req, Res, Render, Redirect } from 'routing-controllers';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import querystring from 'querystring';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth';

import requestKakao from 'request'; // 테스트 후 삭제 예정


const kakao = { 
    clientID: "794ed9a88648a25cbaec8bc25ad4f2a6",
    clientSecret: "BtSD12taxk3DqusTvOjGBQv2MbZoViI3",
    // api/auth/kakao/callback
    redirectUri: "http://localhost:3000/login/kakao/callback"
  };

// auth로 변경 예정
@JsonController('/login')
export class AuthController extends BaseController {
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    // 테스트 후 삭제 예정
    @Get()  
    @Render('view.html')
    public main() {
      console.log('login page');
    }

    // 테스트 후 삭제 예정
    @Get('/kakao')
    public kakaoCheck(@Res() response: any) {

        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${
        kakao.clientID
        }&redirect_uri=${
        kakao.redirectUri
        }&response_type=code`;
    
        return requestKakao.post (kakaoAuthUrl, function(err: any,httpResponse: any,body: any){
        })
    }

    @Get('/kakao/callback')
    public async kakao(@Req() request: any, @Res() response: any) {
        try {
            // 1. kakao access token  
            const kakaoToken = await axios({      
                method: "POST",
                url: "https://kauth.kakao.com/oauth/token",
                headers: {
                "content-type": "application/x-www-form-urlencoded"
                },
                data: querystring.stringify({
                    code: request.query.code,
                    grant_type: "authorization_code",
                    client_id: kakao.clientID,
                    client_secret: kakao.clientSecret,
                    redirect_uri: kakao.redirectUri
                })
            });

            const access_token = kakaoToken.data.access_token;

            // 2. kakao user info by 1's accessToken
            const kakaoUserInfo = await axios({      
                method: "GET",
                url: "https://kapi.kakao.com/v2/user/me",
                headers: { Authorization: `Bearer ${access_token}` }
            });

            const email: string = kakaoUserInfo.data.kakao_account.email;
            let exUser = await this.prisma.user.findOne({ where: { email } });
            let isNewMember: boolean = false;
    
            if (!exUser) {
                isNewMember = true;
                exUser = await this.prisma.user.create({data: {email, name: '', age: -1, socialType: 'kakao', phone: '', pushToken: ''}});
            }
            const token = await jwt.sign(email, 'SeCrEtKeYfOrHaShInG');

            response.cookie('auth_token', token).status(200);
            return { success: true, isNewMember, exUser, token };    
        } catch (error) {
            console.log(error);
            return { success: false, error };
        }
    }

    // @Post('/register')
    // public async register(@BodyParam('email') email: string) {
    //     try {
    //         const newUser = await this.prisma.user.create({data: {email, name: '', age: -1, socialType: 'kakao', phone: '', pushToken: ''}});
    //         return { sueecss: true, newUser };
    //     } catch (error) {
    //         return { success: false, error };
    //     }
    // }

    // @Post('/login')
    // public async login(@BodyParam('email') email: string, @Res() res: any) {
    //     const exUser = await this.prisma.user.findOne({ where: { email } }); 
    //     const token = await jwt.sign(email, 'SeCrEtKeYfOrHaShInG');
    //     res.cookie('auth_token', token).status(200);
    //     return { success: true, token, exUser };    
    // }

    @Get('/user')
    @UseBefore(authMiddleware)
    public async auth(@CookieParam("auth_token") token: string, @Req() req: any) {
        return req.user;
    }
}
import { BaseController } from './BaseController';
import { JsonController, Get, Post, BodyParam, Req, Res, Render } from 'routing-controllers';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import querystring from 'querystring';
import { PrismaClient } from '@prisma/client';

import requestKakao from 'request'; // 테스트 후 삭제 예정

@JsonController('/auth')
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
        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
    
        return requestKakao.post(kakaoAuthUrl, function(err: any,httpResponse: any,body: any){});
    }

    // 테스트 후 삭제 예정
    @Get('/kakao/callback')
    public async kakao(@Req() request: any, @Res() response: any) {
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
                client_id: process.env.KAKAO_CLIENT_ID,
                client_secret: process.env.KAKAO_CLIENT_SECRET,
                redirect_uri: process.env.KAKAO_REDIRECT_URI
            })
        });
        return { access_token: kakaoToken.data.access_token };
    }

    @Post('/login')
    public async login(@BodyParam('access_token') access_token: string, @Res() res: any) {
        try {
            const kakaoUserInfo = await axios({      
                method: "GET",
                url: "https://kapi.kakao.com/v2/user/me",
                headers: { Authorization: `Bearer ${access_token}` }
            });
    
            const email: string = kakaoUserInfo.data.kakao_account.email;
            const exUser: any = await this.prisma.user.findOne({ where: { email } });
            let isNewMember: boolean = false;
    
            if (!exUser) {
                isNewMember = true;
                await this.prisma.user.create({data: { email }});
            }
            const token = await jwt.sign({email: email}, String(process.env.JWT_SECRET_KEY), {expiresIn : "7d"});
    
            return { isNewMember, token };
        } catch (error) {
            throw error;
        } 
    }
}
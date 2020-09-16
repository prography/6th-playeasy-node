import { BaseController } from './BaseController';
import { 
    JsonController, 
    Get, 
    Post, 
    BodyParam, 
    Req, 
    Render,
} from 'routing-controllers';
import axios from 'axios';
import querystring from 'querystring';
import requestKakao from 'request'; 
import { UserService } from '../service/UserService';

@JsonController('/auth')
export class AuthController extends BaseController {

    constructor(private userService: UserService) {
        super();
    }

    @Get()  // 카카오 로그인 테스트용 api
    @Render('view.html')
    public main() {
      console.log('login page');
    }

    @Get('/kakao')  // 카카오 로그인 테스트용 api
    public kakaoCheck() {
        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
    
        return requestKakao.post(kakaoAuthUrl, function(err: any,httpResponse: any,body: any){});
    }

    @Get('/kakao/callback')  // 카카오 로그인 테스트용 api
    public async kakao(@Req() request: any) {
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
    public async login(@BodyParam('access_token') access_token: string) {
        const kakaoUserInfo = await axios({      
            method: "GET",
            url: "https://kapi.kakao.com/v2/user/me",
            headers: { Authorization: `Bearer ${access_token}` }
        });
        const email: string = kakaoUserInfo.data.kakao_account.email;
        // 이메일이 없는 경우 에러처리

        const data = this.userService.login(email);
        return data;
    }
}
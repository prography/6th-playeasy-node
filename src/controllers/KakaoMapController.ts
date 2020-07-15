import { BaseController } from './BaseController';
import { JsonController, Get, Res, QueryParam } from 'routing-controllers';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';

@JsonController('/map')
export class KakaoMapController extends BaseController {
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    @Get('/search')
    public async search(@QueryParam('keyWord') keyWord: string, @Res() res: any) {

        const url = encodeURI("https://dapi.kakao.com/v2/local/search/keyword.json?query="+keyWord);

        try {
            const searchResult = await axios({      
                method: "GET",
                url: url,
                headers: { 
                    'Authorization': `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=euc-kr'
                }
            });
            console.log(searchResult.data.documents);

            const returnData = searchResult.data.documents;
            return { returnData };

        } catch (error) {
            throw error;
        }
     }
}
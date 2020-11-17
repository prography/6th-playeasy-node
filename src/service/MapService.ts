import { Service } from 'typedi';
import { BadRequestError, NotFoundError } from 'routing-controllers';
import axios from 'axios';

@Service()
export class MapService {
    constructor() {}

    public async search(url: string) {
        const searchResult = await axios({      
            method: "GET",
            url: url,
            headers: { 
                'Authorization': `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=euc-kr'
            }
        });

        if (searchResult.data.documents.length === 0)
            return null;
        
        return searchResult.data.documents;
    }
}
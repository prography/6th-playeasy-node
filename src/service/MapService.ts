import { Service } from 'typedi';
import { BadRequestError, NotFoundError } from 'routing-controllers';
import axios from 'axios';

@Service()
export class MapService {
    constructor() {}

    public async search(url: string) {
        try {
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
        } catch (error) {
            console.error(error);
            throw new BadRequestError('검색 키워드의 값이 올바르지 않습니다.');
        }
    }
}
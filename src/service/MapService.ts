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
                throw new NotFoundError('해당 검색어로 장소를 찾을 수 없습니다.');
            
                return searchResult.data.documents;
        } catch (error) {
            throw new BadRequestError('잘못된 형식으로 요청하였습니다.'); 
        }
    }
}
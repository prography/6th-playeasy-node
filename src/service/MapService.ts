import { Service } from 'typedi';
import { NotFoundError } from 'routing-controllers';
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
            
            return searchResult.data.documents;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
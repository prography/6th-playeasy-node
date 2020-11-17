import { BaseController } from './BaseController';
import {
    BadRequestError,
    Get,
    JsonController, 
    NotFoundError, 
    QueryParam,
    Res,
    UseBefore,
    } from 'routing-controllers';
import { checkCurrentUser } from '../middlewares/AuthMiddleware'
import { MapService } from '../service/MapService';
import { Response } from 'express';

@JsonController('/map')
export class MapController extends BaseController {
    constructor(private mapService: MapService) {
        super();
    }

    @Get('/search')
    @UseBefore(checkCurrentUser)
    public async search(@QueryParam('keyword') keyword: string, @Res() res: Response) {
        try {
            const url = encodeURI("https://dapi.kakao.com/v2/local/search/keyword.json?query="+keyword);
        
            const searchResult = await this.mapService.search(url);
            if (searchResult.length === 0)
                res.json({});
                
            return searchResult;
        } catch (error) {
            throw new BadRequestError('유효하지 않은 검색어입니다.');
        }
    }
}
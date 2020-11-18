import { BaseController } from './BaseController';
import {
    Get,
    JsonController, 
    QueryParam,
    UseBefore,
    } from 'routing-controllers';
import { checkCurrentUser } from '../middlewares/AuthMiddleware'
import { MapService } from '../service/MapService';

@JsonController('/map')
export class MapController extends BaseController {
    constructor(private mapService: MapService) {
        super();
    }

    @Get('/search')
    @UseBefore(checkCurrentUser)
    public async search(@QueryParam('keyword') keyword: string) {
        const url = encodeURI("https://dapi.kakao.com/v2/local/search/keyword.json?query="+keyword);
        const searchResult = await this.mapService.search(url); 
        if (!searchResult)  return [];
        return searchResult;        
    }
}
import { BaseController } from './BaseController';
import {
    Body,
    Get,
    HttpCode,
    JsonController, 
    Post,
    Put,
    QueryParam,
    Req,
    UseBefore,
} from 'routing-controllers';
import { MatchApplicationService } from '../service/MatchApplicationService';
import { 
    CreateMatchApplicationDto, 
    UpdateMatchApplicationDto, 
} from '../dto/MatchApplicationDto';
import { checkCurrentUser } from '../middlewares/AuthMiddleware';
import { Request } from 'express';

@JsonController('/application')
export class MatchApplication extends BaseController {
    constructor(private matchApplicationService: MatchApplicationService) {
        super();
    }

    // 매치 신청
    @Post()  
    @HttpCode(201)
    @UseBefore(checkCurrentUser)
    public async add(@Req() req: Request, @Body() createMatchApplicationDto: CreateMatchApplicationDto) {
        return await this.matchApplicationService.add(req.currentUser, createMatchApplicationDto);
    }

    // 매치별 신청 현황 
    @Get('/list')
    @UseBefore(checkCurrentUser)  
    public async getList(@QueryParam('matchId') matchId: number) {
        return await this.matchApplicationService.getListByMatch(matchId);
    }

    // 매치 신청 상태 변경 (승인, 거절, 취소)
    @Put()  
    @UseBefore(checkCurrentUser)  
    public async update(@Body() updateMatchApplicationDto: UpdateMatchApplicationDto) {
        return await this.matchApplicationService.update(updateMatchApplicationDto);
    }
}
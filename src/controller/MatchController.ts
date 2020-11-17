import { BaseController } from './BaseController';
import {
    Body,
    BodyParam,
    Get,
    HttpCode,
    JsonController, 
    Post,
    Put,
    QueryParam,
    Req,
    UseBefore,
    } from 'routing-controllers';
import { MatchService } from '../service/MatchService';
import { CreateMatchDto, UpdateMatchDto } from '../dto/MatchDto';
import { checkCurrentUser } from '../middlewares/AuthMiddleware'
import { Request } from 'express';
import { MatchStatus } from '../util/Enums';

@JsonController('/match')
export class MatchController extends BaseController {
    constructor(private matchService: MatchService) {
        super();
    }

    // 매치 작성
    @Post()
    @HttpCode(201)
    @UseBefore(checkCurrentUser)
    public async add(@Body() createMatchDto: CreateMatchDto, @Req() req: Request) {
        return await this.matchService.add(req.currentUser, createMatchDto);
    }

    // 매치 상세
    @Get()
    @UseBefore(checkCurrentUser)
    public async getOne(@QueryParam('matchId') matchId: number) {
        return await this.matchService.getOne(matchId);
    }

    // 매치 리스트 - 메인화면
    @Get('/list')
    public async getList(@QueryParam('date') date: string) {    
        const matchList = await this.matchService.getListByDate(date);
        if (matchList.length === 0) {
            return {};
        }
        return matchList;
    }

    // 매치 수정
    @Put() 
    @UseBefore(checkCurrentUser)
    public async update(@Req() req: Request, @Body() updateMatchDto: UpdateMatchDto) {
        return await this.matchService.update(req.currentUser, updateMatchDto);
    }

    // 매치 마감
    @Put('/status')  
    @UseBefore(checkCurrentUser)
    public async close(@Req() req: Request, 
                       @BodyParam('matchId') matchId: number,
                       @BodyParam('status') status: MatchStatus) {
        return await this.matchService.updateStatus(req.currentUser, matchId, status);
    }
}
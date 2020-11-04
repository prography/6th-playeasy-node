import { BaseController } from './BaseController';
import {
    Body,
    CurrentUser,
    Get,
    HttpCode,
    JsonController, 
    Post,
    Put,
    QueryParam,
    } from 'routing-controllers';
import { MatchService } from '../service/MatchService';
import { CreateMatchDto, UpdateMatchDto, UpdateMatchStatusDto } from '../dto/MatchDto';
import { User } from '../entity/User';

@JsonController('/match')
export class MatchController extends BaseController {
    constructor(private matchService: MatchService) {
        super();
    }

    // 매치 작성
    @Post()
    @HttpCode(201)
    public async add(@CurrentUser({ required: true }) user: User,
                    @Body() createMatchDto: CreateMatchDto) {
        return await this.matchService.add(user, createMatchDto);
    }

    // 매치 상세
    @Get()
    public async getOne(@CurrentUser({ required: true }) user: User,
                        @QueryParam('matchId') matchId: number) {
        return await this.matchService.getOne(matchId);
    }

    // 매치 리스트 - 메인화면
    @Get('/list')
    public async getList(@QueryParam('date') date: string) {    
        return await this.matchService.getList(date);
    }

    // 매치 수정
    @Put() // 매치 작성자인지 확인
    public async update(@CurrentUser({ required: true }) user: User,
                        @Body() updateMatchDto: UpdateMatchDto) {
        return await this.matchService.update(updateMatchDto);
    }

    // 매치 마감
    @Put('/status')  // 매치 작성자인지 확인
    public async close(@CurrentUser({ required: true }) user: User,
                        @Body() updateMatchStatusDto: UpdateMatchStatusDto) {
        return await this.matchService.updateStatus(updateMatchStatusDto);
    }
}
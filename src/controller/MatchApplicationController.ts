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
import { MatchApplicationService } from '../service/MatchApplicationService';
import { 
    CreateMatchApplicationDto, 
    UpdateMatchApplicationDto, 
} from '../dto/MatchApplicationDto';
import { User } from '../entity/User';

@JsonController('/application')
export class MatchApplication extends BaseController {
    constructor(private matchApplicationService: MatchApplicationService) {
        super();
    }

    // 매치 신청
    @Post()  // 매치 작성자가 아닌 사람만 신청 가능
    @HttpCode(201)
    public async add(@CurrentUser({ required: true }) user: User,
                    @Body() createMatchApplicationDto: CreateMatchApplicationDto) {
        return await this.matchApplicationService.add(user, createMatchApplicationDto);
    }

    // 매치 신청 현황 (매니저)
    @Get()  // 매치 작성자인지 확인
    public async getList(@CurrentUser({ required: true }) user: User,
                        @QueryParam('matchId') matchId: number) {
        return await this.matchApplicationService.getList(matchId);
    }

    // 매치 신청 승인 or 거절 (매니저)
    @Put()  // 매치 작성자인지 확인
    public async update(@CurrentUser({ required: true }) user: User,
                        @Body() updateMatchApplicationDto: UpdateMatchApplicationDto) {
        return await this.matchApplicationService.update(updateMatchApplicationDto);
    }

    // 매치 신청 취소 (사용자)
    @Put()
    public async cancel(@CurrentUser({ required: true }) user: User,
                        @Body() updateMatchApplicationDto: UpdateMatchApplicationDto) {
        return await this.matchApplicationService.cancel(updateMatchApplicationDto);
    }
}
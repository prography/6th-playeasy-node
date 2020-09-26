import { BaseController } from './BaseController';
import {
    BodyParam,
    CurrentUser,
    Get,
    HttpCode,
    JsonController, 
    Post,
    Put,
    QueryParam,
    } from 'routing-controllers';
import { MatchService } from '../service/MatchService';
import { CreateMatchDto, UpdateMatchDto, ResponseMatchDto } from '../dto/MatchDto';
import { CreateLocationDto, UpdateLocationDto } from '../dto/LocationDto';
import { Match } from '../entity/Match';
import { User } from '../entity/User';
import { plainToClass } from 'class-transformer';

@JsonController('/match')
export class MatchController extends BaseController {
    constructor(private MatchService: MatchService) {
        super();
    }

    // 매치 작성
    @Post()
    @HttpCode(201)
    public async add(@CurrentUser({ required: true }) user: User,
                    @BodyParam('matchData') matchData: CreateMatchDto,
                    @BodyParam('locationData') locationData: CreateLocationDto) {
        
    }

    // 매치 상세
    @Get()
    public async getOne(@CurrentUser({ required: true }) user: User,
                        @QueryParam('matchId') matchId: number) {

    }

    // 매치 리스트 - 메인화면
    @Get('/list')
    public async getList(@QueryParam('date') date: string,
                        @QueryParam('status') status: string) {
        
    }

    // 매치 수정
    @Put() // 매치 작성자인지 확인
    public async update(@CurrentUser({ required: true }) user: User,
                        @BodyParam('matchData') matchData: UpdateMatchDto,
                        @BodyParam('locationData') locationData: UpdateLocationDto) {
        
    }

    // 매치 마감
    @Put('/status')  // 매치 작성자인지 확인
    public async close(@CurrentUser({ required: true }) user: User,
                        @BodyParam('matchId') matchId: number,
                        @BodyParam('status') status: StatusType) {

    }
}
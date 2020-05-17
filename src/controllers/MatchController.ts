import { BaseController } from './BaseController';
import { JsonController, Get, Post, Put, Delete, BodyParam, 
        UseBefore, Req, } from 'routing-controllers';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth';

@JsonController('/match')
@UseBefore(authMiddleware)
export class MatchController extends BaseController {
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }
    // @Put()
    // @UseBefore(authMiddleware)
    // public async updateUser(@HeaderParam('authorization') token: string, 
    //                   @Req() req: any,
    //                   @BodyParam('title') title: string, @BodyParam('type') type: number, @BodyParam('description') description: string,
    //                   @BodyParam('location') location: string, @BodyParam('startedAt') startedAt: Date, 
    //                   @BodyParam('homeQuota') homeQuota: number, @BodyParam('fee') fee: number) {

    //     const user = req.user;
    //     const team = await this.prisma.team.findOne({where: { id: user.teamId }});         
        
    //     let matchType;
    //     if (type === 0) {
    //         matchType = MatchType.SOCCKER;
    //     } else if (type === 1) {
    //         matchType = MatchType.FUTSAL5;
    //     } else {
    //         matchType = MatchType.FUTSAL6; 
    //     } 

    //     const matchInfo = {
    //         title, description, location, 
    //         startedAt, homeQuota, fee,
    //         type: matchType,
    //         homeTeamId: team.id,
    //         homeTeam: team,
    //         writerId: user.id,
    //         writer: user,
    //     }

    //     const newMatch = await this.prisma.match.create({ data: matchInfo })

    // }
    @Post()
    @UseBefore(authMiddleware)
    public register(@BodyParam('data') data: Object, 
                    @BodyParam('token') token: String,
                    @Req() req: any) {
        const match = {
            ...data,
            
        }
        // 매치 등록
        // 요청 : token, data: {title, type, description, location, startedAt, homeQuota, fee}
        try {
            
        } catch (error) {
            
        }
    
    }

    @Get()
    public getMatch() {
        // 매치 상세 보기
        return { "data" : 'Match controllers '};
    }

    @Get('/list')
    public getMatchList() {
        // 매치 리스트 보기
    }

    @Put()
    public updateMatch() {
        // 매치 정보 수정
    }

    @Delete()
    public delelteMatch() {

    }

}
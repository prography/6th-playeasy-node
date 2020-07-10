import { BaseController } from './BaseController';
import { JsonController, Get, Post, Put, BodyParam, UseBefore, Req, QueryParam } from 'routing-controllers';
import { PrismaClient, MatchUserApplication, StatusType } from '@prisma/client';
import { isLoggedIn } from '../middlewares/auth';

@JsonController('/match/user')
export class MatchUserController extends BaseController {
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    // 용병 신청
    @Post()
    @UseBefore(isLoggedIn)
    public async register(@Req() req: any,
                        @BodyParam('matchId') matchId: number, 
                        @BodyParam('quota') quota: number) {
        try {
            const status = StatusType.WAITING;
            const application:MatchUserApplication = await this.prisma.matchUserApplication.create({
                data: { 
                    status, quota, 
                    match: {
                        connect: { id : matchId }
                    },
                    user: {
                        connect: { id: req.user.id }
                    }
                }
            });

            return { application }
        } catch (error) {
            throw error;
        }
    }

    // 용병 지원 현황 (매니저)
    @Get('/list')
    @UseBefore(isLoggedIn)
    public async getList(@QueryParam("matchId") matchId: number) {
        try {
            const matchUserApplication = await this.prisma.matchUserApplication.findMany({
                where: { matchId },
                include: { user: true }, 
            });
    
            return { matchUserApplication };
        } catch (error) {
            throw error;
        }
    }

    // 신청 상태 변경
    @Put()
    @UseBefore(isLoggedIn)
    public async cancel(@BodyParam('matchUserApplicationId') matchUserApplicationId : number,
                        @BodyParam('status') status: StatusType) {
        try {
            const matchUserApplication = await this.prisma.matchUserApplication.update({
                where: { id: matchUserApplicationId },
                data: { status }
            });

            return { matchUserApplication }
        } catch (error) {
            throw error;
        }
    }
}
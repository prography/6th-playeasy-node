import { BaseController } from './BaseController';
import { JsonController, Get, Post, Put, BodyParam, UseBefore, Req, QueryParam } from 'routing-controllers';
import { PrismaClient, StatusType, User } from '@prisma/client';
import { isLoggedIn } from '../middlewares/auth';

@JsonController('/match/user')
export class MatchUserController extends BaseController {
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    // 용병 신청 (이미 해당 매치에 신청해서 대기 중인 사람은 또 신청 못하게 하는 로직 추가해야 함)
    @Post()
    @UseBefore(isLoggedIn)
    public async register(@Req() req: any,
                        @BodyParam('matchId') matchId: number, 
                        @BodyParam('quota') quota: number) {
        try {
            const status = StatusType.WAITING;
            await this.prisma.matchUserApplication.create({
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

            return { success: true }
        } catch (error) {
            throw error;
        }
    }

    // 용병 지원 현황 (매니저)
    @Get('/list')
    @UseBefore(isLoggedIn)
    public async getList(@QueryParam("matchId") matchId: number) {
        try {
            const applicationList = await this.prisma.matchUserApplication.findMany({
                where: { matchId },
                select: {
                    id: true, status: true, quota: true,
                    user: {
                        select: {
                            id: true, name: true, age: true, level: true,
                        }
                    }
                }
            });
    
            return { applicationList };
        } catch (error) {
            throw error; 
        }
    }

    // 용병 정보
    @Get()
    @UseBefore(isLoggedIn)
    public async getPerson(@QueryParam("userId") userId: number) {
        try {
            const user: object | null = await this.prisma.user.findOne({
                where: { id: userId },
                select: {
                    id: true, name: true, age: true,
                    level: true, phone: true, description: true,
                }
            });

            return { user }
        } catch (error) {
            throw error;
        }
    }

    // 신청 상태 변경
    @Put()
    @UseBefore(isLoggedIn)
    public async cancel(@BodyParam('applicationId') applicationId : number,
                        @BodyParam('status') status: StatusType) {
        try {
            await this.prisma.matchUserApplication.update({
                where: { id: applicationId },
                data: { status }
            });

            return { success: true }
        } catch (error) {
            throw error;
        }
    }
}
import { BaseController } from './BaseController';
import { JsonController, Get, Post, Put, BodyParam, UseBefore, Req, QueryParam, HttpCode } from 'routing-controllers';
import { PrismaClient, StatusType, User, MatchUserApplication } from '@prisma/client';
import { isLoggedIn, isWriter } from '../middlewares/auth';

@JsonController('/match/user')
export class MatchUserController extends BaseController {
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    // 용병 신청
    @Post()
    @HttpCode(201)
    @UseBefore(isLoggedIn)
    public async register(@Req() req: any,
                        @BodyParam('matchId') matchId: number, 
                        @BodyParam('quota') quota: number) {
        try {
            const applicationCount = await this.prisma.matchUserApplication.count({
                where: { 
                    AND: [ { userId: req.user.id }, { matchId: matchId } ]
                }
            });

            if (applicationCount !== 0) {
                throw new Error('이미 신청했던 매치입니다.');
            }

            const status = StatusType.WAITING;
            const application = await this.prisma.matchUserApplication.create({
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
    @UseBefore(isLoggedIn, isWriter)
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
            const application: MatchUserApplication = await this.prisma.matchUserApplication.update({
                where: { id: applicationId },
                data: { status }
            });

            return { application }
        } catch (error) {
            throw error;
        }
    }
}
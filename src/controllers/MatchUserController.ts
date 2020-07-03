import { BaseController } from './BaseController';
import { JsonController, Get, Post, Put, Delete, BodyParam, 
    UseBefore, Req, HeaderParam, NotFoundError, UnauthorizedError, QueryParam } from 'routing-controllers';
import { PrismaClient, User, Match, MatchUserApplication, StatusType } from '@prisma/client';
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
    @UseBefore(isLoggedIn)
    public async register(@HeaderParam('authorization') token: string, @Req() req: any,
                    @BodyParam('matchId') matchId: number, @BodyParam('quota') quota: number) {
        try {
            const status = StatusType.WAITING;
            const application:MatchUserApplication = await this.prisma.matchUserApplication.create({
                data: { status, quota, 
                    match: {
                        connect: { id : matchId }
                    },
                    user: {
                        connect: { id: req.user.id }
                    }
                }
            });
            return { success: true, application }
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    // 용병 지원 현황 (매니저)
    @Get('/list')
    @UseBefore(isLoggedIn, isWriter)
    public async getList(@HeaderParam('authorization') token: string,
                    @Req() req: any,
                    @QueryParam("matchId") matchId: number) {
        try {
            // const user: User = req.user;
            // const match = await this.prisma.match.findOne({ where: { id: matchId }});

            // if(!match) 
            //     throw new NotFoundError('해당하는 match 정보가 없습니다.');
        
            // if(user.id !== match.writerId)
            //     throw new UnauthorizedError('권한이 없는 유저입니다.');
            const matchUserApplication = await this.prisma.matchUserApplication.findMany({
                 where: { matchId },
                 include: { user: true }, 
            });

            return { success: true, matchUserApplication };
            
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    // 용병 신청 취소 (신청자)
    @Delete()
    @UseBefore(isLoggedIn)
    public async cancel(@HeaderParam('authorization') token: string,
                    @BodyParam('matchUserApplicationId') matchUserApplicationId : number) {
        try {
            const status = StatusType.CANCEL;
            const matchUserApplication = await this.prisma.matchUserApplication.update({
                where: { id: matchUserApplicationId },
                data: { status }
            });

            return { success: true, matchUserApplication }
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    // 용병 신청 승인 (매니저)
    @Put('/approval')
    @UseBefore(isLoggedIn, isWriter)
    public async approve(@HeaderParam('authorization') token: string,
                    @Req() req: any,
                    @BodyParam('matchId') matchId: number,
                    @BodyParam('matchUserApplicationId') matchUserApplicationId : number) {
        try {
            // const user = req.user;
            // const match = await this.prisma.match.findOne({ where: { id: matchId }});

            // if(!match) 
            // throw new NotFoundError('해당하는 match 정보가 없습니다.');
    
            // if(user.id !== match.writerId)
            //     throw new UnauthorizedError('권한이 없는 유저입니다.');
            const status = StatusType.CONFIRMED;
            const matchUserApplication = await this.prisma.matchUserApplication.update({
                where: { id: matchUserApplicationId },
                data: { status }
            });

            return { success: true, matchUserApplication }

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}
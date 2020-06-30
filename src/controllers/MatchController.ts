import { BaseController } from './BaseController';
import { JsonController, Get, Post, Put, Delete, BodyParam, 
        UseBefore, Req, HeaderParam, NotFoundError, UnauthorizedError, QueryParam } from 'routing-controllers';
import { PrismaClient, User, Match, MatchType, Location } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth';

// enum MatchType {
//     SOCCKER = "SOCCKER",
//     FUTSAL5 = "FUTSAL5",
//     FUTSAL6 = "FUTSAL6", 
// }

@JsonController('/match')
export class MatchController extends BaseController {
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    // 매치 생성
    @Post()
    @UseBefore(authMiddleware)
    public async register(@HeaderParam('authorization') token: string, @Req() req: any,
                    @BodyParam('type') type: MatchType, @BodyParam('description') description:  string,
                    @BodyParam('startAt') startAt: Date, @BodyParam('duration') duration: number,
                    @BodyParam('fee') fee:  number, @BodyParam('phone') phone: string,
                    @BodyParam('totalQuota') totalQuota:  number, @BodyParam('location') location: Location) {
        try {
            // let type;
            // if (matchType === 0) type = MatchType.SOCCKER;
            // else if (matchType === 1) type = MatchType.FUTSAL5;
            // else type = MatchType.FUTSAL6;
            
            const match: Match = await this.prisma.match.create({
                data: {
                    type, description, startAt, duration,
                    fee, phone, totalQuota,
                    writer: {
                        connect: { id: req.user.id },
                    },
                    homeTeam: {
                        connect: { id: req.user.teamId }
                    },
                    location: {
                        create: location 
                    }  
                }
            });

            return { success: true, match, }

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    // 매치 상세
    @Get()
    public async getMatch(@QueryParam('id') matchId: number) {
        try {
            const match = await this.prisma.match.findOne({ where: { id: matchId }});

            if (!match) 
                throw new NotFoundError('해당 매치를 찾을 수 없습니다.');
            
            return { success: true, match, }

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    // 매치 리스트 (매치 메인화면) -> 필터 기능 추가해야 함
    @Get('/list')
    public async getMatchList() {
        try {
            const matchList = await this.prisma.match.findMany();

            if (!matchList)
                throw new NotFoundError('매치 정보를 찾을 수 없습니다.');
            
            return { success: true, matchList, }

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    // 매치 수정 
    @Put()
    @UseBefore(authMiddleware)
    public async updateMatch(@HeaderParam('authorization') token: string, @Req() req: any,
                             @BodyParam('matchId') matchId: number,
                             @BodyParam('data') data: object) {
        try {
            const user: User = req.user;        
            const match = await this.prisma.match.findOne({ where: { id: matchId }});

            if(!match) 
                throw new NotFoundError('해당하는 match 정보가 없습니다.');
            
            if(user.id !== match.writerId)
                throw new UnauthorizedError('해당 권한이 없는 유저입니다.');

            const updatedMatch = await this.prisma.match.update({
                where: { id: matchId },
                data: { ...data },
            });

            if (!updatedMatch)
                throw new Error('매치 정보를 수정하는데 실패했습니다.');
            
            return { success: true, updatedMatch, }

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
    // 매치 마감
    // @Delete()
    // @UseBefore(authMiddleware)
    // public async delelteMatch(@HeaderParam('authorization') token: string, 
    //                           @Req() req: any, 
    //                           @BodyParam('matchId') matchId: number) {
    //     try {
    //         const user: User = req.user;
    //         const match = await this.prisma.match.findOne({ where: { id: matchId }});
            
    //         if(!match) 
    //             throw new NotFoundError('해당하는 match 정보가 없습니다.');
            
    //         if(user.id !== match.writerId)
    //             throw new UnauthorizedError('해당 권한이 없는 유저입니다.');

    //         await this.prisma.match.delete({ where: { id: matchId }});

    //         return { success: true };
            
    //     } catch (error) {
    //         console.error(error);
    //         throw new Error(error);
    //     }
    // }
}
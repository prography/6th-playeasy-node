import { BaseController } from './BaseController';
import { JsonController, Get, Post, Put, Delete, BodyParam, 
        UseBefore, Req, HeaderParam, Param, NotFoundError, UnauthorizedError, QueryParam } from 'routing-controllers';
import { PrismaClient, User, Match } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth';

enum MatchType {
    SOCCKER = "SOCCKER",
    FUTSAL5 = "FUTSAL5",
    FUTSAL6 = "FUTSAL6", 
}

@JsonController('/match')
export class MatchController extends BaseController {
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    @Post()
    @UseBefore(authMiddleware)
    public async register(@HeaderParam('authorization') token: string, @Req() req: any,
                    @BodyParam('title') title:  string,
                    @BodyParam('type') matchType:  number,
                    @BodyParam('description') description:  string,
                    @BodyParam('location') location:  string,
                    @BodyParam('fee') fee:  number,
                    @BodyParam('startAt') startAt: Date,
                    @BodyParam('endAt') endAt: Date,
                    @BodyParam('homeQuota') homeQuota:  number,
                   ) {
        try {
            let type;
            if (matchType === 0) type = MatchType.SOCCKER;
            else if (matchType === 1) type = MatchType.FUTSAL5;
            else type = MatchType.FUTSAL6;
            
            const match: Match = await this.prisma.match.create({
                data: {
                    title, type, description, homeQuota,
                    location, fee, startAt, endAt,
                    writer: {
                        connect: { id: req.user.id },
                    }  
                }
            });

            return { success: true, match, }

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

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

    @Delete()
    @UseBefore(authMiddleware)
    public async delelteMatch(@HeaderParam('authorization') token: string, 
                              @Req() req: any, 
                              @BodyParam('matchId') matchId: number) {
        try {
            const user: User = req.user;
            const match = await this.prisma.match.findOne({ where: { id: matchId }});
            
            if(!match) 
                throw new NotFoundError('해당하는 match 정보가 없습니다.');
            
            if(user.id !== match.writerId)
                throw new UnauthorizedError('해당 권한이 없는 유저입니다.');

            await this.prisma.match.delete({ where: { id: matchId }});

            return { success: true };
            
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}
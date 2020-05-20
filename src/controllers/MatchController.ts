import { BaseController } from './BaseController';
import { JsonController, Get, Post, Put, Delete, BodyParam, 
        UseBefore, Req, HeaderParam, Param, NotFoundError, UnauthorizedError } from 'routing-controllers';
import { PrismaClient, User, Match } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth';

enum MatchType {
    SOCCKER = "SOCCKER",
    FUTSAL5 = "FUTSAL5",
    FUTSAL6 = "FUTSAL6", 
}

@JsonController('/match')
@UseBefore(authMiddleware)
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
                    @BodyParam('homeQuota') homeQuota:  string,
                   ) {
        try {

            let type;
            if (matchType === 0) type = MatchType.SOCCKER;
            else if (matchType === 1) type = MatchType.FUTSAL5;
            else type = MatchType.FUTSAL6;
            
            const match: Match = await this.prisma.match.create({
                data: {
                    title, type, description,  
                    location, fee, startAt, endAt,
                    writer: {
                        connect: { id: req.user.id },
                    }  
                }
            });

            return {
                success: true, match,
            }

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    @Get('/:id')
    public async getMatch(@Param('matchId') matchId: number) {
        try {

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    @Get('/list')
    public async getMatchList() {
        try {

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
        
    }

    // @Put('/:id')
    // public async updateMatch(@HeaderParam('authorization') token: string, @Req() req: any,
    //                          @Param('matchId') matchId: number,
    //                          @BodyParam('data') data: object) {
    //     try {
    //         const user: User = req.user;
        
    //         const match = await this.prisma.match.findOne({ where: {id: matchId }});
            
    //         if(!match) 
    //             throw new NotFoundError('해당하는 match 정보가 없습니다.');
            
    //         if(user.id !== match.homeTeamId)
    //             throw new UnauthorizedError('해당 권한이 없는 유저입니다.');

    //         const updatedMatch = await this.prisma.match.update({
    //             where: { id: matchId, homeUserId: user.id },
    //             data: { ...data }
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         throw new Error(error);
    //     }

    // }

    // @Delete('/:id')
    // public async delelteMatch(@HeaderParam('authorization') token: string, 
    //                           @Req() req: any, 
    //                           @Param('matchId') matchId: number) {
    //     try {
    //         const user: User = req.user;
    //         const match = await this.prisma.match.findOne({ where: { id: matchId }});
            
    //         if(!match) 
    //             throw new NotFoundError('해당하는 match 정보가 없습니다.');
            
    //         if(user.id !== match.homeTeamId)
    //             throw new UnauthorizedError('해당 권한이 없는 유저입니다.');

    //         await this.prisma.match.delete({ where: { id: matchId }});

    //     return { success: true };

    //     } catch (error) {
    //         console.error(error);
    //         throw new Error(error);
    //     }
    // }
}
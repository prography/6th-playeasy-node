import { BaseController } from './BaseController';
import { JsonController, Get, Post, Put, BodyParam, 
        UseBefore, Req, HeaderParam, NotFoundError, QueryParam, Patch } from 'routing-controllers';
import { PrismaClient, Match, Location, StatusType } from '@prisma/client';
import { isLoggedIn, isWriter } from '../middlewares/auth';

@JsonController('/match')
export class MatchController extends BaseController {
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    // 매치 작성
    @Post()
    @UseBefore(isLoggedIn)
    public async register(@HeaderParam('authorization') token: string, @Req() req: any,
                    @BodyParam('resource') resource: Match, @BodyParam('location') location: Location) {
        try {       
            const match: Match = await this.prisma.match.create({
                data: {
                    ...resource, 
                    writer: {
                        connect: { id: req.user.id },
                    },
                    homeTeam: {
                        connect: { id: req.user.teamId }
                    },
                    location: {
                        create: location 
                    }  
                },
                include: { 
                    homeTeam: true,
                    location: true,
                }
            });
            return { success: true, match }
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    // 매치 상세
    @Get()
    @UseBefore(isLoggedIn)
    public async getMatch(@QueryParam('id') matchId: number) {
        try {
            const match = await this.prisma.match.findOne({
                where: { id: matchId },
                include: { 
                    homeTeam: true,
                    location: true,
                }
            });

            if (!match) 
                throw new NotFoundError('해당 매치를 찾을 수 없습니다.');
            
            return { success: true, match }
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    // 매치 (매치 메인화면) -> 장소 필터 추가해야 함
    @Get('/list')
    public async getMatchList(@QueryParam('date') date: string,
                            @QueryParam('status') status: string) {
        try {
            let matchList: Array<Match>;
            matchList = await this.prisma.match.findMany({
                where: {
                    startAt: {
                        gte: new Date(`${date}T00:00:00`),
                        lte: new Date(`${date}T23:59:59`),
                    }
                },
            });

            if (status === "available") {
                matchList.filter((match) => {
                    match.status = StatusType.WAITING
                });
            } 

            if (!matchList)
                throw new NotFoundError('매치 정보를 찾을 수 없습니다.');
            
            return { success: true, matchList }
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    // 매치 수정 
    @Put()
    @UseBefore(isLoggedIn, isWriter)
    public async updateMatch(@HeaderParam('authorization') token: string, @Req() req: any,
                            @QueryParam('matchId') matchId: number, 
                            @BodyParam('resource') resource: object, @BodyParam('location') location: Location) {
        try {
            let updatedLocation: Location;
            if (location) {
                updatedLocation = await this.prisma.location.update({
                    where: { id: location.id },
                    data: { ...location },
                });
            }

            const updatedMatch = await this.prisma.match.update({
                where: { id: matchId },
                data: { ...resource },
                include: { 
                    homeTeam: true,
                    location: true,
                }
            });

            if (!updatedMatch)
                throw new Error('매치 정보를 수정하는데 실패했습니다.');
            
            return { success: true, updatedMatch }

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
    
    // 매치 마감
    @Patch('/status')
    @UseBefore(isLoggedIn, isWriter)
    public async closeMatch(@HeaderParam('authorization') token: string, 
                              @Req() req: any, 
                              @QueryParam('matchId') matchId: number,
                              @BodyParam('status') status: StatusType) {
        try {
            const updatedMatch: Match = await this.prisma.match.update({
                where: { id: matchId },
                data: { status }
            });

            return { success: true, updatedMatch };
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}
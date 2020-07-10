import { BaseController } from './BaseController';
import { JsonController, Get, Post, Put, BodyParam, 
        UseBefore, Req, NotFoundError, QueryParam } from 'routing-controllers';
import { PrismaClient, Match, Location, StatusType } from '@prisma/client';
import { isLoggedIn } from '../middlewares/auth';

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
    public async register(@Req() req: any,
                        @BodyParam('matchData') matchData: Match, 
                        @BodyParam('locationData') locationData: Location) {
        try {
            await this.prisma.match.create({
                data: {
                    ...matchData, 
                    writer: { connect: { id: req.user.id } },
                    homeTeam: { connect: { id: req.user.teamId } },
                    location: { create: locationData }  
                }
            });

            return { success: true }
        } catch (error) {
            throw error;
        }
    }

    // 매치 상세
    @Get()
    @UseBefore(isLoggedIn)
    public async getMatch(@QueryParam('matchId') matchId: number) {
        try {
            const match = await this.prisma.match.findOne({
                where: { id: matchId },
                select: {
                    id: true, type: true, description: true,
                    startAt: true, duration: true, fee: true,
                    phone: true, totalQuota: true, status: true, 
                    writerId: true,
                    homeTeam: {
                        select: {
                            id: true, name: true, description: true,
                            age: true, level: true, leader: true, phone: true
                        }
                    },
                    location: {
                        select: {
                            id: true, latitude: true, longitude: true,
                            name: true, address: true, detail: true,
                        }
                    },
                }
            });
    
            if (!match) 
                throw new NotFoundError('해당 매치를 찾을 수 없습니다.');

            return { match }
        } catch (error) {
            throw error;            
        }
        
    }

    // 매치 (매치 메인화면) -> 장소 필터 추가해야 함
    @Get('/list')
    public async getMatchList(@QueryParam('date') date: string, 
                            @QueryParam('status') status: string) {
        try {
            let matchList;
            matchList = await this.prisma.match.findMany({
                where: {
                    startAt: {
                        gte: new Date(`${date}T00:00:00`),
                        lte: new Date(`${date}T23:59:59`),
                    }
                },
                select: {
                    id: true, type: true, description: true,
                    startAt: true, duration: true, fee: true,
                    phone: true, totalQuota: true, status: true, 
                    writerId: true,
                    homeTeam: {
                        select: {
                            id: true, name: true, description: true,
                            age: true, level: true, leader: true, phone: true
                        }
                    },
                    location: {
                        select: {
                            id: true, latitude: true, longitude: true,
                            name: true, address: true, detail: true,
                        }
                    },
                }
            });
    
            if (status === "available") {
                matchList.filter((match) => {
                    match.status = StatusType.WAITING
                });
            } 
            
            return { matchList }
        } catch (error) {
            throw error;
        }
    }

    // 매치 수정 
    @Put()
    @UseBefore(isLoggedIn)
    public async updateMatch(@BodyParam('matchData') matchData: Match, 
                            @BodyParam('locationData') locationData: Location) {
        try {
            if (locationData) {
                await this.prisma.location.update({
                    where: { id: locationData.id },
                    data: { ...locationData },
                });
            }

            const match: object = await this.prisma.match.update({
                where: { id: matchData.id },
                data: { ...matchData },
                select: {
                    id: true, type: true, description: true,
                    startAt: true, duration: true, fee: true,
                    phone: true, totalQuota: true, status: true, 
                    writerId: true,
                    homeTeam: {
                        select: {
                            id: true, name: true, description: true,
                            age: true, level: true, leader: true, phone: true
                        }
                    },
                    location: {
                        select: {
                            id: true, latitude: true, longitude: true,
                            name: true, address: true, detail: true,
                        }
                    },
                }
            });
            
            return { match }
        } catch (error) {
            throw error;
        }
    }
    
    // 매치 마감 
    @Put('/status')
    @UseBefore(isLoggedIn)
    public async closeMatch(@BodyParam('matchId') matchId: number,
                            @BodyParam('status') status: StatusType) {
        try {
            const match: object = await this.prisma.match.update({
                where: { id: matchId },
                data: { status },
                select: {
                    id: true, type: true, description: true,
                    startAt: true, duration: true, fee: true,
                    phone: true, totalQuota: true, status: true, 
                    writerId: true,
                    homeTeam: {
                        select: {
                            id: true, name: true, description: true,
                            age: true, level: true, leader: true, phone: true
                        }
                    },
                    location: {
                        select: {
                            id: true, latitude: true, longitude: true,
                            name: true, address: true, detail: true,
                        }
                    },
                }
            });

            return { match }
        } catch (error) {
            throw error;
        }
    }
}
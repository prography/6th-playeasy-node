import { BaseController } from './BaseController';
import { JsonController, Get, Put, UseBefore, Req, BodyParam, QueryParam, Body } from 'routing-controllers';
import { PrismaClient, User, Level, Team } from '@prisma/client';
import { isLoggedIn } from '../middlewares/auth';

@JsonController('/users')
export class UserController extends BaseController {
    private prisma: PrismaClient;
    
    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    // 내 정보
    @Get()  
    @UseBefore(isLoggedIn)
    public getUser(@Req() req: any) {
        return {
            success: true,
            user: req.user,
        }
    }
    
    // 나의 매치 정보 - 내가 등록한 매치
    @Get("/matches")
    @UseBefore(isLoggedIn)
    public async getMatchList(@Req() req: any)  {
        try {
            const matchList = await this.prisma.match.findMany({
                where: { writerId: req.user.id },
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

            return { matchList } 
        } catch (error) {
            throw error;
        }
    }

    // 나의 매치 정보 - 나의 신청 현황
    @Get("/applications")
    @UseBefore(isLoggedIn)
    public async getApplicationList(@Req() req: any, @QueryParam("type") type: string) {
        try {
            let applicationList;
            if (type === "team") {
                applicationList = await this.prisma.matchTeamApplication.findMany({
                    where: { teamId: req.user.teamId },
                    select: {
                        id: true, quota: true, status: true,
                        match: {
                            select: {
                                id: true, startAt: true, duration: true,
                                location: {
                                    select: {
                                        id: true,
                                        name: true,
                                        address: true,
                                        detail: true,
                                    }
                                }
                            }
                        },
                    }
                });                
            } else if (type === "personal") {
                applicationList = await this.prisma.matchUserApplication.findMany({
                    where: { userId: req.user.id },
                    select: {
                        id: true, quota: true, status: true,
                        match: {
                            select: {
                                id: true, startAt: true, duration: true,
                                location: {
                                    select: {
                                        id: true,
                                        name: true,
                                        address: true,
                                        detail: true,
                                    }
                                }
                            }
                        },
                    }
                });         
            } else {
                throw new Error('올바른 Param 값이 전달되지 않았습니다.');
            }

            return { applicationList }
        } catch (error) {
            throw error;
        }
    }

    // 내 정보 수정 
    @Put()  
    @UseBefore(isLoggedIn)
    public async updateUser(@Req() req: any, 
                            @BodyParam('userData') userData: User) {   
        try {
            const exUser: User = req.user;

            const name: string | null = userData.name;
            const age: number | null = userData.age;
            const phone: string | null = userData.phone;
            const level: Level | null = userData.level;
            const description: string | null = userData.description;
            
            const user: object = await this.prisma.user.update({
                where: { id: exUser.id },
                data: { name, age, phone, level, description },
                select: {
                    id: true, name: true, age: true, email: true,
                    socialType: true, phone: true, pushToken: true,
                    level: true, description: true, picture: true,
                    team: {
                        select: {
                            id: true, name: true, description: true,
                            age: true, level: true, leader: true, phone: true,
                        }
                    }
                }
            });

            return { user }
        } catch (error) {
            throw error;
        }
    }
    // 사진 
}
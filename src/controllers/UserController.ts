import { BaseController } from './BaseController';
import { JsonController, Get, Put, UseBefore, Req, BodyParam, QueryParam } from 'routing-controllers';
import { PrismaClient, User, Level } from '@prisma/client';
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
    public getMatchList(@Req() req: any)  {
        this.prisma.match.findMany({
            where: { writerId: req.user.id }
        })
        .then(matchList => {
            return { success: true, matchList }
        })
        .catch(error => {
            throw error;
        });
    }

    // 나의 매치 정보 - 나의 신청 현황
    @Get("/applications")
    @UseBefore(isLoggedIn)
    public async getApplicationList(@Req() req: any, @QueryParam("type") type: string) {
        try {
            if (type === "team") {
                const applicationList = await this.prisma.matchTeamApplication.findMany({
                    where: { teamId: req.user.teamId },
                    include: { match: true }
                });
                return { success: true, applicationList }
                
            } else if (type === "personal") {
                const applicationList = await this.prisma.matchUserApplication.findMany({
                    where: { userId: req.user.id },
                    include: { match: true }
                });
                return { success: true, applicationList }
            } else {
                throw new Error('올바른 Param 값이 전달되지 않았습니다.');
            }
        } catch (error) {
            throw error;
        }
    }

    // 내 정보 수정 
    @Put()  
    @UseBefore(isLoggedIn)
    public async updateUser(@Req() req: any, 
                            @BodyParam('userUpdateDto') userUpdateDto: User) {   
        try {
            const user: User = req.user;

            const name: string | null = userUpdateDto.name;
            const age: number | null = userUpdateDto.age;
            const phone: string | null = userUpdateDto.phone;
            const level: Level | null = userUpdateDto.level;
            const description: string | null = userUpdateDto.description;
            
            const updatedUser: User = await this.prisma.user.update({
                where: { id: user.id },
                data: { name, age, phone, level, description },
            });

            return { success: true, updatedUser }
        } catch (error) {
            throw error;
        }
    }

    // 사진 
}


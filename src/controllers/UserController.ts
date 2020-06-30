import { BaseController } from './BaseController';
import { JsonController, Get, Put, UseBefore, HeaderParam, Req, BodyParam } from 'routing-controllers';
import { PrismaClient, User, Level } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth';

@JsonController('/users')
export class UserController extends BaseController {
    private prisma: PrismaClient;
    
    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    // 유저 정보 조회
    @Get()  
    @UseBefore(authMiddleware)
    public getUser(@HeaderParam('authorization') token: string, @Req() req: any) {
        return {
            success: true,
            user: req.user,
        }
    }
    
    // 내가 등록한 매치 보기
    @Get("/matches")
    @UseBefore(authMiddleware)
    public getMatchList(@HeaderParam('authorization') token: string, @Req() req: any) {
        const matchList = this.prisma.match.findMany({
            where: { writerId: req.user.id }
        });

        return { success: true, matchList }
    }

    // 내가 신청한 매치 보기 (팀, 유저)
    @Get("/applications")
    @UseBefore(authMiddleware)
    public getApplicationList(@HeaderParam('authorization') token: string, @Req() req: any) {
        const teamApplicationList = this.prisma.matchTeamApplication.findMany({
            where: { teamId: req.user.teamId }
        });

        const userApplicationList = this.prisma.matchUserApplication.findMany({
            where: { userId: req.user.id }
        });

        return { success: true, teamApplicationList, userApplicationList }
    }

    @Put()  // 내 정보 수정
    @UseBefore(authMiddleware)
    public async updateUser(@HeaderParam('authorization') token: string, @Req() req: any, 
                      @BodyParam('name') name: string, @BodyParam('age') age: number, 
                      @BodyParam('phone') phone: string, @BodyParam('level') level: Level,
                      @BodyParam('description') description: string) {
        
       try {
            const user: User = req.user;
            const updatedUser: User = await this.prisma.user.update({
                where: { id: user.id },
                data: { name, age, phone, level, description },
            });

            return { success: true, updatedUser }
       } catch (error) {
           console.error(error);
           throw new Error(error);
       }
    }

    // 사진 
}


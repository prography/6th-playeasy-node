import { BaseController } from './BaseController';
import { JsonController, Get, Put, UseBefore, HeaderParam, Req, BodyParam, QueryParam } from 'routing-controllers';
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
    public getUser(@HeaderParam('authorization') token: string, @Req() req: any) {
        return {
            success: true,
            user: req.user,
        }
    }
    
    // 내가 등록한 매치
    @Get("/matches")
    @UseBefore(isLoggedIn)
    public async getMatchList(@HeaderParam('authorization') token: string, @Req() req: any) {
        try {
            const matchList = await this.prisma.match.findMany({
                where: { writerId: req.user.id }
            });
    
            return { success: true, matchList }
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    // 나의 신청 현황
    @Get("/applications")
    @UseBefore(isLoggedIn)
    public async getApplicationList(@HeaderParam('authorization') token: string, 
                            @Req() req: any,
                            @QueryParam("type") type: string) {
        try {
            if (type === "team") {
                const applicationList = await this.prisma.matchTeamApplication.findMany({
                    where: { teamId: req.user.teamId }
                });
                return { success: true, applicationList }
            } else if (type === "personal") {
                const applicationList = await this.prisma.matchUserApplication.findMany({
                    where: { userId: req.user.id }
                });
                return { success: true, applicationList }
            } 
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    // 내 정보 수정 
    @Put()  
    @UseBefore(isLoggedIn)
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

    // 내 정보 수정 
    // @Put()  
    // @UseBefore(authMiddleware)
    // public async updateUser(@HeaderParam('authorization') token: string, @Req() req: any, 
    //                   @BodyParam('name') name: string, @BodyParam('age') age: number, 
    //                   @BodyParam('phone') phone: string, @BodyParam('level') level: Level,
    //                   @BodyParam('description') description: string) {   
    //    try {
    //         const user: User = req.user;
    //         const updatedUser: User = await this.prisma.user.update({
    //             where: { id: user.id },
    //             data: { name, age, phone, level, description },
    //         });

    //         return { success: true, updatedUser }
    //    } catch (error) {
    //        console.error(error);
    //        throw new Error(error);
    //    }
    // }

    // 사진 
}


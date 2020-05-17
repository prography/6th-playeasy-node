import { BaseController } from './BaseController';
import { JsonController, Get, Put, UseBefore, HeaderParam, Req, BodyParam, Body } from 'routing-controllers';
import { PrismaClient, User } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth';

enum MatchType {
    SOCCKER = "SOCCKER",
    FUTSAL5 = "FUTSAL5",
    FUTSAL6 = "FUTSAL6", 
}

@JsonController('/users')
export class UserController extends BaseController {
    private prisma: PrismaClient;
    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    @Get()
    @UseBefore(authMiddleware)
    public getUser(@HeaderParam('authorization') token: string, @Req() req: any) {
        return {
            isAuth: true,
            user: req.user,
        }
    }

    @Put()
    @UseBefore(authMiddleware)
    public async updateUser(@HeaderParam('authorization') token: string, @Req() req: any,
                      @BodyParam('name') name: string, 
                      @BodyParam('age') age: number, 
                      @BodyParam('phone') phone: string,
                      @BodyParam('teamName') teamName: string) {
        
        const user: User = req.user;
        const updatedUser: User = this.prisma.user.update({
             where: { id: user.id },
            data: { name, age, phone, teamName },
        });

        return { isUpdated: true, user }
    }
}


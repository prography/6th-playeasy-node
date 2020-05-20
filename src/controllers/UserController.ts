import { BaseController } from './BaseController';
import { JsonController, Get, Put, UseBefore, HeaderParam, Req, BodyParam, Body } from 'routing-controllers';
import { PrismaClient, User } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth';

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
            success: true,
            user: req.user,
        }
    }

    @Put()
    @UseBefore(authMiddleware)
    public async updateUser(@HeaderParam('authorization') token: string, 
                            @Req() req: any, 
                      @BodyParam('name') name: string, 
                      @BodyParam('age') age: number, 
                      @BodyParam('phone') phone: string) {
        
       try {
            const user: User = req.user;
            const updatedUser: User = await this.prisma.user.update({
                where: { id: user.id },
                data: { name, age, phone },
            });

            return { success: true, user }
       } catch (error) {
           console.error(error);
           throw new Error(error);
       }
    }
}


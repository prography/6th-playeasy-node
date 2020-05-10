import { BaseController } from './BaseController';
import { JsonController, Get, Param, Post, BodyParam, Body, Req, Res } from 'routing-controllers';
import { PrismaClient, User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { resolve } from 'dns';
import { response } from 'express';

@JsonController('/auth')
export class MatchController extends BaseController {
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    @Post('/register')
    public register(@BodyParam('email') email: string, @Res() res: any) {
        console.log(email);
        return this.prisma.user.create({data: {email, name: '', age: -1, socialType: 'kakao', phone: '', pushToken: ''}});                
    }
//.then(() => {
//     res.status(200).json({ success: true });
// })
// .catch( (err: any) => {
//     res.json({ success: false, err });
// })
    @Post('/login')
    public login(@BodyParam("email") email: string) {
        
        
    }

    @Get('/auth')
    public auth() {

    }

    @Get('/logout')
    public logout() {

    }
}
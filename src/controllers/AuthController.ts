import { BaseController } from './BaseController';
import passport from 'passport';
import { JsonController, Get, Param, Post } from 'routing-controllers';
import { PrismaClient } from '@prisma/client';

@JsonController('/auth')
export class AuthController extends BaseController {
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    @Post('/signup')
    public join() {
        return { "data" : 'users controllers'};
    }

    @Post('/login')
    public login() {

    }

    @Post('/logout')
    public logout() {

    }
}
import { BaseController } from './BaseController';
import { JsonController, UseBefore, HeaderParam, Req, BodyParam, Post, Body, Put, Get, Delete } from 'routing-controllers';
import { PrismaClient, User, Team, MatchTeamApplication, Level } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth';

@JsonController('/team')
export class TeamController extends BaseController {
    private prisma: PrismaClient;
    
    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    // create team
    @Post()
    @UseBefore(authMiddleware)
    public async teamRegister(@Body() registInfo: any) {
        try {
            //1. init data defination
            let name:string =  registInfo.name;
            let description:string = registInfo.description;
            let age:number = parseInt(registInfo.age);
            let level:Level = registInfo.level;
            let leader:string = registInfo.leader;
            let phone:string = registInfo.phone;

            //2. insert into team table
            const createTeam: Team = await this.prisma.team.create({
                data: {  name, description, age, level, leader, phone }
            });

            return { success: true, createTeam }

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    //update team info
    @Put()
    @UseBefore(authMiddleware)
    public async teamUpdate(@Body() updateInfo: any) {
        try {
            //1. init data defination
            let teamId:number = parseInt(updateInfo.teamId);
            let name:string =  updateInfo.name;
            let description:string = updateInfo.description;
            let age:number = parseInt(updateInfo.age);
            let level:Level = updateInfo.level;
            let leader:string = updateInfo.leader;
            let phone:string = updateInfo.phone;
            

            //2. insert into team table
            const updateTeam: Team = await this.prisma.team.update({
                where: { id: teamId },
                data: {  name, description, age, level, leader, phone }
            });

            return { success: true, updateTeam }

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    //get team info
    @Get('/info')
    @UseBefore(authMiddleware)
    public async getTeamInfo(@Body() updateInfo: any) {
        try {
            //1. init data defination
            let teamId:number = parseInt(updateInfo.teamId);          

            //2. select team info
            const teamInfo= this.prisma.team.findMany({
                where: { id : teamId }
            });

            return { success: true, teamInfo }

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    //get user info from table
    @Get('/userList')
    @UseBefore(authMiddleware)
    public async getTeamMember(@Body() memberListInfo: any) {
        try {
            //1. init data defination
            let teamId:number = parseInt(memberListInfo.teamId);
            
            //2. select team member from team table
            const userList: User[] = await this.prisma.user.findMany({
                where: { teamId: teamId },
            });

            return { success: true, userList }

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    //search team Info
    @Get('/searchList')
    @UseBefore(authMiddleware)
    public async getTeamList(@Body() teamListInfo: any) {
        try {
            //1. init data defination
            let serachInfo:string = teamListInfo.serachInfo;

            console.log(serachInfo);
            
            //2. select team member from team table
            const teamList: Team[] = await this.prisma.team.findMany({
                where: { OR: [
                    {
                        name: {
                        contains: serachInfo,
                      },
                    },
                    {
                      leader: {
                        contains: serachInfo,
                      },
                    },
                  ]
                },
            });

            return { success: true, teamList }

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }


    //delete member from team
    @Delete('/member')
    @UseBefore(authMiddleware)
    public async deleteTeamMember(@Body() deleteMemberInfo: any) {
        try {
            //1. init data defination
            let userId:number = parseInt( deleteMemberInfo.userId );
            let teamId:number = parseInt( deleteMemberInfo.teamId );
            
            //2. delete member from team table

            const userInfo: User = await this.prisma.user.update({
                where: { id: userId },
                data: { 
                    team: {
                        connect: { id : null }
                    },
                updatedAt: new Date()} 
            });

            //3. select refreshed team member from team table
            const userList: User[] = await this.prisma.user.findMany({
                where: { teamId: teamId },
            });
            return { success: true, userList }

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
    /*
    @Post()
    @UseBefore(authMiddleware)
    public async createOrUpdateTeam(@HeaderParam('authorization') token: string, 
                      @Req() req: any,
                      @BodyParam("name") name: string,
                      @BodyParam("description") description: string) {
        try {
            const user: User = req.user;

            const team: Team = await this.prisma.team.upsert({
                where: {id: req.user.id },
                update: { name, description },
                create: { name, description },
            });

            const updatedTeam: Team = await this.prisma.team.update({
                where: { id: team.id },
                data: {
                    users: {
                        connect: { id: user.teamId }
                    }
                }
            });

            return { success: true, updatedTeam, user, }

        } catch (error) {
            console.error(error);
            throw new Error('팀 정보 update 실패');
        }
    } */


    
}


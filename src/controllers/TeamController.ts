import { BaseController } from './BaseController';
import { JsonController, UseBefore, BodyParam, Post, Body, Put, Get, Delete, QueryParam } from 'routing-controllers';
import { PrismaClient, User, Team } from '@prisma/client';
import { isLoggedIn } from '../middlewares/auth';

@JsonController('/team')
export class TeamController extends BaseController {
    private prisma: PrismaClient;
    
    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    // create team
    @Post()
    @UseBefore(isLoggedIn)
    public async teamRegister(@BodyParam('team') team: Team) {
        try {

            const createTeam: Team = await this.prisma.team.create({
                data: { ...team }
            });

            return { createTeam }

        } catch (error) {
            throw error;
        }
    }

    //update team info
    @Put()
    @UseBefore(isLoggedIn)
    public async teamUpdate(@BodyParam('team') team: Team) {
        try {

            const updateTeam: Team = await this.prisma.team.update({
                where: { id: team.id },
                data: {  ...team }
            });

            return { updateTeam }

        } catch (error) {
            throw error;
        }
    }

    //get team info from table
    @Get('/info')
    @UseBefore(isLoggedIn)
    public async getTeamInfo(@QueryParam("teamId") teamId: number) {
        try {

            //select team member from team table
            const teamInfo = await this.prisma.team.findOne({
                where: { id: teamId },
            });

            return { teamInfo }

        } catch (error) {
            throw error;
        }
    }

    //get user info from table
    @Get('/userList')
    @UseBefore(isLoggedIn)
    public async getTeamMember(@QueryParam("teamId") teamId: number) {
        try {

            //select team member from team table
            const userList: User[] = await this.prisma.user.findMany({
                where: { teamId: teamId },
            });

            return { userList }

        } catch (error) {
            throw error;
        }
    }

    //search team Info
    @Get('/searchList')
    @UseBefore(isLoggedIn)
    public async getTeamList(@QueryParam("searchInfo") searchInfo: string) {
        try {

            console.log(searchInfo);
            //select team member from team table
            const teamList: Team[] = await this.prisma.team.findMany({
                where: { OR: [
                    {
                        name: {
                        contains: searchInfo,
                      },
                    },
                    {
                      leader: {
                        contains: searchInfo,
                      },
                    },
                  ]
                },
            });

            return { teamList }

        } catch (error) {
            throw error;
        }
    }


    //delete member from team
    @Delete('/member')
    @UseBefore(isLoggedIn)
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
                        disconnect: true
                    },
                updatedAt: new Date()} 
            });

            //3. select refreshed team member from team table
            const userList: User[] = await this.prisma.user.findMany({
                where: { teamId: teamId },
            });
            return { userList }

        } catch (error) {
            throw error;
        }
    }
}
import { BaseController } from './BaseController';
import { JsonController, UseBefore, HeaderParam, Req, BodyParam, Post, Body, Put, Get, Delete, QueryParam } from 'routing-controllers';
import { PrismaClient, User, Team, MatchTeamApplication, Level } from '@prisma/client';
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

            return { success: true, createTeam }

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    //update team info
    @Put()
    @UseBefore(isLoggedIn)
    public async teamUpdate(@BodyParam('teamId') teamId: number, @BodyParam('team') team: object) {
        try {

            console.log(teamId);

            const updateTeam: Team = await this.prisma.team.update({
                where: { id: teamId },
                data: {  ...team }
            });

            return { success: true, updateTeam }

        } catch (error) {
            console.error(error);
            throw new Error(error);
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

            return { success: true, teamInfo }

        } catch (error) {
            console.error(error);
            throw new Error(error);
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

            return { success: true, userList }

        } catch (error) {
            console.error(error);
            throw new Error(error);
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

            return { success: true, teamList }

        } catch (error) {
            console.error(error);
            throw new Error(error);
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
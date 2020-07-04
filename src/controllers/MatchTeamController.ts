import { BaseController } from './BaseController';
import { JsonController, Get, Post, Put, Delete, BodyParam, 
    UseBefore, Req, HeaderParam, Param, NotFoundError, UnauthorizedError, QueryParam, Body } from 'routing-controllers';
import { PrismaClient, MatchTeamApplication } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth';


enum StatusType {
    WAITING = "WAITING",
    CONFIRMED = "CONFIRMED",
    DENIED = "DENIED",
    CANCEL = "CANCEL"
  }

@JsonController('/match/team')
export class MatchTeamController extends BaseController {
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    //Away Team apply for the team match
    @Post()
    @UseBefore(authMiddleware)
    public async matchTeamRegister(@Body() registInfo: any) {
        try {
            
            console.log('ryz test');
            //1. init data defination
            // MatchTeamApplication N : 1 Match, Team
            let matchId:number =  parseInt(registInfo.matchId);
            let teamId:number = parseInt(registInfo.teamId);
            let quota:number = parseInt(registInfo.quota);

            //2. insert into table
            const matchTeamApplication: MatchTeamApplication = await this.prisma.matchTeamApplication.create({
                data: { quota, 
                        team: {
                            connect: {id : teamId}
                        }, 
                        match: {
                            connect: {id : matchId}
                        }
                }
            });

            return { success: true, matchTeamApplication }

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    //Away Team cancle application
    @Delete()
    @UseBefore(authMiddleware)
    public async cancleMatchTeamApplication(@Body() updateInfo: any) {
        try {
            //1. init the insert info
            const matchTeamApplicationId:number = parseInt(updateInfo.matchTeamApplicationId);
            const statusCancel = StatusType.CANCEL;

            //2. update the matchTeamApplication status as 'CANCEL'
            const canceledMatchTeamApplication = await this.prisma.matchTeamApplication.update({
                where: { id:matchTeamApplicationId},
                data: { status:statusCancel, updatedAt: new Date()}
            });

            if (!canceledMatchTeamApplication)
                throw new Error('매치 신청 정보를 수정하는데 실패했습니다.');
            
            return { success: true, canceledMatchTeamApplication}

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }


   //Manager will see the team match status
   @Get('/list')
   public async getMatchTeamList(@Body() searchInfo: any) {
       try {
           //1. init the insert info
           let matchId:number =  parseInt(searchInfo.matchId);

           console.log(matchId);

           //2. select team list from match table
           const matchTeamApplicationList = await this.prisma.matchTeamApplication.findMany({ 
               where: { NOT: [{status:StatusType.CANCEL}], AND: {matchId: matchId}},
               include: { team: true }
            });

           if (!matchTeamApplicationList) 
               throw new NotFoundError('해당 매치를 찾을 수 없습니다.');
           
           return { success: true, matchTeamApplicationList }

       } catch (error) {
           console.error(error);
           throw new Error(error);
       }
    }

    //Manager approve the team application
    @Put('/approve')
    @UseBefore(authMiddleware)
    public async approveMatchTeamApplication(@Body() approveInfo: any) {
        try {
            //1. init the insert info
            const matchTeamApplicationId:number = parseInt(approveInfo.matchTeamApplicationId);
            const matchId:number =  parseInt(approveInfo.matchId);
            const statusConfirmed = StatusType.CONFIRMED;

            //2. check whether there's the match info
            const matchTeamApplication = await this.prisma.match.findOne(
                { where: { id: matchId }}
            );

            console.log(matchTeamApplication);

            if(!matchTeamApplication) 
                throw new NotFoundError('신청한 match가 없습니다.');
        
            // 3. update status -> matchTeamApplication
            const approvedMatchTeamApplication = await this.prisma.matchTeamApplication.update({
                where: { id: matchTeamApplicationId },
                data: { status:statusConfirmed, updatedAt: new Date()}
            });

            if (!(approvedMatchTeamApplication))
                throw new Error('해당 팀을 최종선택 하시는데 실패했습니다.');
            
            return { success: true, approvedMatchTeamApplication }

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    //Manager cancel the team application
    @Put('/cancel')
    @UseBefore(authMiddleware)
    public async cancelMatchTeamApplication(@Body() approveInfo: any) {
        try {
            //1. init the insert info
            const matchTeamApplicationId:number = parseInt(approveInfo.matchTeamApplicationId);
            const matchId:number =  parseInt(approveInfo.matchId);
            const statusDenied = StatusType.DENIED;

            //2. check whether there's the match info
            const matchTeamApplication = await this.prisma.match.findOne(
                { where: { id: matchId }}
            );

            console.log(matchTeamApplication);

            if(!matchTeamApplication) 
                throw new NotFoundError('신청한 match가 없습니다.');
        
            // 3. update status -> matchTeamApplication
            const deniedMatchTeamApplication = await this.prisma.matchTeamApplication.update({
                where: { id: matchTeamApplicationId },
                data: { status:statusDenied, updatedAt: new Date()},
                
            });

            if (!(deniedMatchTeamApplication))
                throw new Error('해당 팀을 하시는데 거절하시는데 실패했습니다.');
            
            return { success: true, deniedMatchTeamApplication }

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}
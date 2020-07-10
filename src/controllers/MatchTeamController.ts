import { BaseController } from './BaseController';
import { JsonController, Get, Post, Put, Delete, UseBefore, 
        Req, NotFoundError, QueryParam, Body, BodyParam } from 'routing-controllers';
import { PrismaClient, MatchTeamApplication } from '@prisma/client';
import { isLoggedIn } from '../middlewares/auth';


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
    @UseBefore(isLoggedIn)
    public async matchTeamRegister(@Req() req: any, @Body() registInfo: any) {
        try {
            
            console.log('ryz test');
            console.log(req.user.teamId);

            
            //1. init data defination
            // MatchTeamApplication N : 1 Match, Team
            let matchId:number =  parseInt(registInfo.matchId);
            let teamId:number = parseInt(req.user.teamId);
            let quota:number = parseInt(registInfo.quota);

            if (!teamId)
            throw new NotFoundError('소속된 팀 정보가 없습니다.');


            //2. check whether the match info is already existed in database
            const matchTeamSearchInfo = await this.prisma.matchTeamApplication.count({
                where: { AND: [
                    {
                        teamId: teamId,
                    },
                    {
                      matchId: matchId,
                    },
                  ]
                },
            });

            console.log(matchTeamSearchInfo);

            if (matchTeamSearchInfo != 0)
             throw new NotFoundError('이미 해당 매치를 신청하셨습니다.');

            //3. insert into table
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

            return { matchTeamApplication }

        } catch (error) {
            throw error;
        }
    }

    //Away Team cancle application
    @Delete()
    @UseBefore(isLoggedIn)
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
            
            return { canceledMatchTeamApplication }

        } catch (error) {
            throw error;
        }
    }


   //Manager will see the team match status
   @Get('/list')
   public async getMatchTeamList(@QueryParam("matchId") matchId: number) {
        try {

            //1. select team list from match table
            const matchTeamApplicationList = await this.prisma.matchTeamApplication.findMany({ 
               where: { NOT: [{status:StatusType.CANCEL}], AND: {matchId: matchId}},
               include: { team: true }
            });

            if (!matchTeamApplicationList) 
               throw new NotFoundError('해당 매치를 찾을 수 없습니다.');
           
            return { matchTeamApplicationList }

        } catch (error) {
            throw error;
        }
    }

    //Manager approve the team application
    @Put()
    @UseBefore(isLoggedIn)
    public async approveMatchTeamApplication(@BodyParam('applicationId') applicationId : number, @BodyParam('status') status: StatusType) {
        try {
            //1. init the insert info
            // const matchTeamApplicationId:number = parseInt(approveInfo.matchTeamApplicationId);
            // const matchId:number =  parseInt(approveInfo.matchId);
            // const statusConfirmed = StatusType.CONFIRMED;

            // //2. check whether there's the match info
            // const matchTeamApplication = await this.prisma.match.findOne(
            //     { where: { id: matchId }}
            // );

            // console.log(matchTeamApplication);

            // if(!matchTeamApplication) 
            //     throw new NotFoundError('신청한 match가 없습니다.');
        
            // 3. update status -> matchTeamApplication
            const approvedMatchTeamApplication = await this.prisma.matchTeamApplication.update({
                where: { id: applicationId },
                data: { status:status, updatedAt: new Date()}
            });

            if (!(approvedMatchTeamApplication))
                throw new Error('해당 팀을 최종선택 하시는데 실패했습니다.');
            
            return { approvedMatchTeamApplication }

        } catch (error) {
            throw error;
        }
    }
}
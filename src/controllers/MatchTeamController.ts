// import { BaseController } from './BaseController';
// import { JsonController, Get, Post, Put, Delete, BodyParam, 
//     UseBefore, Req, HeaderParam, Param, NotFoundError, UnauthorizedError, QueryParam, Body } from 'routing-controllers';
// import { PrismaClient, MatchTeamApplication } from '@prisma/client';
// import { authMiddleware } from '../middlewares/auth';


// enum StatusType {
//     WAITING = "WAITING",
//     CONFIRMED = "CONFIRMED",
//     DENIED = "DENIED",
//     CANCEL = "CANCEL"
//   }

// @JsonController('/matchTeam')
// export class MatchTeamController extends BaseController {
//     private prisma: PrismaClient;

//     constructor() {
//         super();
//         this.prisma = new PrismaClient();
//     }

//     //Away Team apply for the team match
//     @Post('/Register')
//     @UseBefore(authMiddleware)
//     public async matchTeamRegister(@Req() req: any, @Body() registInfo: any) {
//         try {
            
//             //1. insert data defination
//             let matchId:number =  parseInt(registInfo.matchId);
//             let homeQuota:number = parseInt(registInfo.homeQuota);
//             let teamId:number = req.user.teamId;

//             console.log(teamId);

//             //2. insert into table
//             const matchTeamApplication: MatchTeamApplication = await this.prisma.matchTeamApplication.create({
//                 data: {
//                     matchId, homeQuota, teamId
//                 }
//             });

//             return { success: true, matchTeamApplication }

//         } catch (error) {
//             console.error(error);
//             throw new Error(error);
//         }
//     }

//     //Manager will see the team match status
//     @Get('/list')
//     public async getMatchTeamList() {
//         try {

//             //1. 매치 정보 확인
//             const matchTeamApplicationList = await this.prisma.matchTeamApplication.findMany();

//             if (!matchTeamApplicationList) 
//                 throw new NotFoundError('해당 매치를 찾을 수 없습니다.');
            
//             return { success: true, matchTeamApplicationList }

//         } catch (error) {
//             console.error(error);
//             throw new Error(error);
//         }
//     }

//     //Away Team cancle application
//     @Put('/cancel')
//     @UseBefore(authMiddleware)
//     public async cancleMatchTeamApplication(@Req() req: any, @Body() updateInfo: any) {
//         try {

//             const teamId:number = req.user.teamId;
//             const matchId:number =  parseInt(updateInfo.matchId);
//             const statusCancel = StatusType.CANCEL;

//             const matchTeamApplication = await this.prisma.matchTeamApplication.findOne(
//                 { where: {matchId_teamId:{matchId:matchId, teamId:teamId,}}}
//             );

//             console.log(matchTeamApplication);

//             if(!matchTeamApplication) 
//                 throw new NotFoundError('신청한 match가 없습니다.');

//             const matchTeamApplcationId:number = matchTeamApplication.id;
//             const canceledMatchTeamApplication = await this.prisma.matchTeamApplication.update({
//                 where: { id:matchTeamApplcationId},
//                 data: { status:statusCancel }
//             });

//             if (!canceledMatchTeamApplication)
//                 throw new Error('매치 신청 정보를 수정하는데 실패했습니다.');
            
//             return { success: true, canceledMatchTeamApplication}

//         } catch (error) {
//             console.error(error);
//             throw new Error(error);
//         }
//     }

//     //Home Team select the final application
//     @Put('/approve')
//     @UseBefore(authMiddleware)
//     public async approveMatchTeamApplication(@Body() approveInfo: any) {
//         try {
//             const teamId:number = parseInt(approveInfo.teamId);
//             const matchId:number =  parseInt(approveInfo.matchId);
//             const statusConfirmed = StatusType.CONFIRMED;
//             const statusDenied = StatusType.DENIED;
            
//             //Search for matchTeamApplication Id 
//             const matchTeamApplication = await this.prisma.matchTeamApplication.findOne(
//                 { where: {matchId_teamId:{matchId:matchId, teamId:teamId}}
//             });

//             if(!matchTeamApplication) 
//                 throw new NotFoundError('신청한 match가 없습니다.');

//             const matchTeamApplcationId:number = matchTeamApplication.id;
//             const awayQuota:number = matchTeamApplication.homeQuota;

//             // 1. confirmed seleceted team -> matchTeamApplication
//             const deniedMatchTeamApplication = await this.prisma.matchTeamApplication.updateMany({
//                 where: { NOT: [{status:StatusType.CANCEL}], AND: {matchId: matchId}},
//                 data: { status:statusDenied }
//             });

//             // 2. update status -> matchTeamApplication
//             const approvedMatchTeamApplication = await this.prisma.matchTeamApplication.update({
//                 where: { id: matchTeamApplcationId },
//                 data: { status:statusConfirmed }
//             });

//             // 3. update match detailed info -> match
//             const approvedMatch = await this.prisma.match.update({
//                 where: { id: matchId },
//                 data: { awayQuota:awayQuota, awayTeamId:teamId}
//             });

//             if (!(approvedMatchTeamApplication&&deniedMatchTeamApplication))
//                 throw new Error('해당 팀을 최종선택 하시는데 실패했습니다.');
            
//             return { success: true, approvedMatchTeamApplication }

//         } catch (error) {
//             console.error(error);
//             throw new Error(error);
//         }
//     }

// }
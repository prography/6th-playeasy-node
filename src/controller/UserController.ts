import { BaseController } from './BaseController';
import { 
    JsonController, 
    Get, 
    Put, 
    Body, 
    CurrentUser, 
    } from 'routing-controllers';
import { UserService } from '../service/UserService';
import { UpdateUserDto, ResponseUserDto } from '../dto/UserDto';
import { User } from '../entity/User';
import { plainToClass } from 'class-transformer';

@JsonController('/user')
export class UserController extends BaseController {    
    constructor(private userService: UserService) {
        super();
    }

    // 내 정보
    @Get()  
    public getUser(@CurrentUser({ required: true }) user: User) {
        const userInfo: ResponseUserDto = plainToClass(ResponseUserDto, user);

        return userInfo;
    }

    // 내 정보 수정 
    @Put()  
    public async updateUser(@CurrentUser({ required: true }) user: User,
                            @Body() updateUserDto: UpdateUserDto) {   
        const updatedUser: ResponseUserDto = await this.userService.update(user, updateUserDto);

        return updatedUser;
    }
    
    // // 나의 매치 정보 - 내가 등록한 매치
    // @Get("/matches")
    // @UseBefore(isLoggedIn)
    // public async getMatchList(@Req() req: any)  {
    //     const matchList = await this.prisma.match.findMany({
    //         where: { writerId: req.user.id },
    //         select: {
    //             id: true, type: true, description: true,
    //             startAt: true, duration: true, fee: true,
    //             phone: true, totalQuota: true, status: true, 
    //             writerId: true,
    //             homeTeam: {
    //                 select: {
    //                     id: true, name: true, description: true,
    //                     age: true, level: true, leader: true, phone: true
    //                 }
    //             },
    //             location: {
    //                 select: {
    //                     id: true, latitude: true, longitude: true,
    //                     name: true, address: true, detail: true,
    //                 }
    //             },
    //         }
    //     });

    //     return { matchList } 
    // }

    // // 나의 매치 정보 - 나의 신청 현황
    // @Get("/applications")
    // @UseBefore(isLoggedIn)
    // public async getApplicationList(@Req() req: any, @QueryParam("type") type: string) {
    //     try {
    //         let applicationList;
    //         if (type === "team") {
    //             applicationList = await this.prisma.matchTeamApplication.findMany({
    //                 where: { teamId: req.user.teamId },
    //                 select: {
    //                     id: true, quota: true, status: true,
    //                     match: {
    //                         select: {
    //                             id: true, startAt: true, duration: true,
    //                             location: {
    //                                 select: {
    //                                     id: true,
    //                                     name: true,
    //                                     address: true,
    //                                     detail: true,
    //                                 }
    //                             }
    //                         }
    //                     },
    //                 }
    //             });                
    //         } else if (type === "personal") {
    //             applicationList = await this.prisma.matchUserApplication.findMany({
    //                 where: { userId: req.user.id },
    //                 select: {
    //                     id: true, quota: true, status: true,
    //                     match: {
    //                         select: {
    //                             id: true, startAt: true, duration: true,
    //                             location: {
    //                                 select: {
    //                                     id: true,
    //                                     name: true,
    //                                     address: true,
    //                                     detail: true,
    //                                 }
    //                             }
    //                         }
    //                     },
    //                 }
    //             });         
    //         } else {
    //             throw new Error('올바른 Param 값이 전달되지 않았습니다.');
    //         }

    //         return { applicationList }
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}
import { BaseController } from './BaseController';
import { 
    JsonController, 
    Get, 
    Put, 
    Body, 
    UseBefore,
    Req,
    QueryParam,
    } from 'routing-controllers';
import { UserService } from '../service/UserService';
import { MatchService } from '../service/MatchService';
import { MatchApplicationService } from '../service/MatchApplicationService';
import { UpdateUserDto, ResponseUserDto } from '../dto/UserDto';
import { plainToClass } from 'class-transformer';
import { checkCurrentUser } from '../middlewares/AuthMiddleware';
import { Request } from 'express';
import { ApplicationType } from '../utils/Enums';

@JsonController('/user')
export class UserController extends BaseController {    
    constructor(
        private userService: UserService,
        private matchService: MatchService,
        private matchApplicationService: MatchApplicationService) {
        super();
    }

    // 내 정보
    @Get()
    @UseBefore(checkCurrentUser)  
    public getUser(@Req() req: Request) {
        const userInfo: ResponseUserDto = plainToClass(ResponseUserDto, req.currentUser);

        return userInfo;
    }

    // 내 정보 수정 
    @Put()
    @UseBefore(checkCurrentUser)   
    public async updateUser(
        @Req() req: Request, @Body() updateUserDto: UpdateUserDto) {   
        return await this.userService.update(req.currentUser, updateUserDto);
    }
    
    // 나의 매칭 정보 - 내가 등록한 매치
    @Get("/matches")
    @UseBefore(checkCurrentUser)
    public async getMatchList(@Req() req: Request) {
        return await this.matchService.getListByUser(req.currentUser);
    }

    // 나의 매칭 정보 - 나의 신청 현황
    @Get("/applications")
    @UseBefore(checkCurrentUser)
    public async getApplicationList(@Req() req: Request, @QueryParam("type") type: ApplicationType) {
        return this.matchApplicationService.getListByUser(req.currentUser, type);
    }
}
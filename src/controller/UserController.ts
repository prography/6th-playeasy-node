import { BaseController } from './BaseController';
import { 
    JsonController, 
    Get, 
    Put, 
    UseBefore, 
    Req, 
    BodyParam, 
} from 'routing-controllers';
import { isLoggedIn } from '../middlewares/auth';
import { UserService } from '../service/UserService';
import { MatchService } from '../service/MatchService';
import { MatchApplicationService } from '../service/MatchApplicationService';

@JsonController('/users')
export class UserController extends BaseController {
    // 생성자 주입을 사용한 의존성 주입
    constructor(
        private userService: UserService,
        private matchService: MatchService,
        private matchAppicationService: MatchApplicationService) { super(); }

    // 내 정보
    @Get()  
    @UseBefore(isLoggedIn)
    public getUser(@Req() req: any) {
        return {
            success: true,
            user: req.user,
        }
    }
    
    // 나의 매치 정보 - 내가 등록한 매치
    @Get("/matches")
    @UseBefore(isLoggedIn)
    public async getMatchList(@Req() req: any)  {
        // 매치서비스에서 내가 등록한 매치를 가져온다
        const userId = req.user.id;
        const matches = await this.matchService.getMatchByWriter(userId);

        return matches;
    }

    // 나의 매치 정보 - 나의 신청 현황
    @Get("/applications")
    @UseBefore(isLoggedIn)
    public async getApplicationList(@Req() req: any) {
        // 매치신청 서비스에서 사용자가 신청한 매치신청목록을 가져온다
        const userId = req.user.id;
        const applications = await this.matchAppicationService.getMatchApplicationsByUser(userId);

        return applications;
    }

    // 내 정보 수정 
    @Put()  
    @UseBefore(isLoggedIn)
    public async updateUser(@Req() req: any, 
                            @BodyParam('userData') updateUserDto: UpdateUserDto) {   
        // 유저 서비스에서 내 정보를 업데이트한다
        const userId = req.user.id;
        const user = await this.userService.updateUser(userId);

        return user;
    }
}
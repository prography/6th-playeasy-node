import { BaseController } from './BaseController';
import { JsonController, UseBefore, HeaderParam, Req, BodyParam, Post } from 'routing-controllers';
import { PrismaClient, User, Team } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth';

@JsonController('/team')
export class TeamController extends BaseController {
    private prisma: PrismaClient;
    
    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    // 팀 생성 or 수정
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
                update: { name, description, },
                create: { name, description },
            });

            const updatedTeam: Team = await this.prisma.team.update({
                where: { id: team.id },
                data: {
                    users: {
                        connect: { id: user.id }
                    }
                }
            });

            return {
                success: true, team, user, 
            }

        } catch (error) {
            console.error(error);
            throw new Error('팀 정보 update 실패');
        }
    }
}


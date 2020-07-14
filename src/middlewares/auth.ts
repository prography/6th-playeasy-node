import { PrismaClient, Match } from '@prisma/client';
import jwt from 'jsonwebtoken';


export async function isLoggedIn(req: any, res: any, next: any) {
    try {
        const prisma: any = new PrismaClient();
        
        const token: string = req.header('authorization');
        const decoded: any = await jwt.verify(token, String(process.env.JWT_SECRET_KEY));

        let email;
        for (const key in decoded) 
            if (key === 'email') 
                email = decoded.email;
        
        const exUser = await prisma.user.findOne({ 
            where: { email },
            select: {
                id: true, name: true, age: true, email: true,
                socialType: true, phone: true, pushToken: true,
                level: true, description: true, picture: true,
                teamId: true,
                team: {
                    select: {
                        id: true, name: true, description: true,
                        age: true, level: true, leader: true, phone: true,
                    }
                }
            } 
        });
        
        if (!exUser)
            throw new Error('해당하는 유저 정보가 없습니다.');
        
        req.user = exUser;
        next();
    } catch (error) {
        next(error);
    }
}

export async function isWriter(req: any, res: any, next: any) {
    try {
        const prisma: any = new PrismaClient();
        let matchId: number;
        if (req.query.matchId) {
            matchId = Number(req.query.matchId);
        } else {
            matchId = Number(req.body.matchId);
        }


        const match: Match = await prisma.match.findOne({ where: { id: matchId }});
        
        if(req.user.id !== match.writerId)
            throw new Error('Match 등록자만 접근 가능한 요청입니다.');

        next();
    } catch (error) {
        next(error);
    }
}

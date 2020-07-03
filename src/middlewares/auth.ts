import { PrismaClient, User, Match } from '@prisma/client';
import jwt from 'jsonwebtoken';


export async function isLoggedIn(req: any, res: any, next: any) {
    try {
        const prisma: any = new PrismaClient();

        const token: string = req.header('authorization');
        const decoded: any = await jwt.verify(token, 'SeCrEtKeYfOrHaShInG');

        let email;
        for (const key in decoded) 
            if (key === 'email') 
                email = decoded.email;
        
        const exUser: User = await prisma.user.findOne({ 
            where: { email },
            include: { team: true } 
        });
        
        if (!exUser)
            return res.status(404).json({ isAuth: false, message: '해당하는 유저 정보가 없습니다.' });
        
        req.user = exUser;
        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export async function isWriter(req: any, res: any, next: any) {
    try {
        const prisma: any = new PrismaClient();
        const matchId: number = Number(req.query.matchId);
        const match: Match = await prisma.match.findOne({ where: { id: matchId }});
            
        if(!match) 
            return res.status(404).json({ isAuth: false, message: '해당하는 매치 정보가 없습니다.' });
        
        if(req.user.id !== match.writerId)
            return res.status(401).json({ isAuth: false, message: '해당 권한이 없는 유저입니다.' });

        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
}

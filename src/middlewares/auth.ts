import { PrismaClient, User, Match } from '@prisma/client';
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
        
        const exUser: User = await prisma.user.findOne({ 
            where: { email },
            include: { team: true } 
        });
        
        if (!exUser)
            throw new Error('해당하는 유저 정보가 없습니다.');
        
        req.user = exUser;
        next();
    } catch (error) {
        next(error);
    }
}

// export async function isWriter(req: any, res: any, next: any) {
//     try {
//         const prisma: any = new PrismaClient();
//         const matchId: number = Number(req.query.matchId);
//         const match: Match = await prisma.match.findOne({ where: { id: matchId }});
        
//         if(req.user.id !== match.writerId)
//             throw new Error('해당 권한이 없는 유저입니다.');

//         next();
//     } catch (error) {
//         next(error);
//     }
// }

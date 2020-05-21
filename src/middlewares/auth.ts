import { PrismaClient, User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export async function authMiddleware(req: any, res: any, next: any) {
    try {
        const token: string = req.header('authorization');
        const prisma: any = new PrismaClient();

        const decoded: any = await jwt.verify(token, 'SeCrEtKeYfOrHaShInG');

        let email;
        for (const key in decoded) 
            if (key === 'email') 
                email = decoded.email;
        
        const exUser: User = await prisma.user.findOne({ where: { email } });
        
        if (!exUser)
            return res.json({ isAuth: false, message: '해당하는 유저 정보가 없습니다.' });
        
        req.user = exUser;
        next();
        
    } catch (error) {
        console.error(error);
        next(error);
    }
}

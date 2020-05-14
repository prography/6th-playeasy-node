import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

export async function authMiddleware(req: any, res: any, next: any) {
    try {
        const token = req.cookies.auth_token;
        const prisma = new PrismaClient();

        const decoded = await jwt.verify(token, 'SeCrEtKeYfOrHaShInG');
        const exUser = await prisma.user.findOne({ where: { email: String(decoded) } });
        
        if (!exUser)
            return res.json({ isAuth: false, error: true });
        req.user = exUser;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

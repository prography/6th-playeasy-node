import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

export async function authMiddleware(req: any, res: any, next: any) {
    try {
        const token = req.cookies.auth_token;
        const prisma = new PrismaClient();

        const decoded = await jwt.verify(token, 'SeCrEtKeYfOrHaShInG');
        const exUser = await prisma.user.findOne({ where: { email: String(JSON.parse(JSON.stringify(decoded)).email) } });
        
        if (!exUser)
            return res.json({ isAuth: false, error: true });
        req.user = exUser;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}


// import {ExpressMiddlewareInterface} from "routing-controllers";
 
// export class AuthMiddleware implements ExpressMiddlewareInterface { 
//     use(req: any, res: any, next: any): any {
//         try {
//             const token = req.cookies.token;
//             const prisma = new PrismaClient();
            
//             let exUser;
//             jwt.verify(token, 'SeCrEtKeYfOrHaShInG', (err: any, decoded: any) => {
//                 exUser = prisma.user.findOne({ where: {email: String(decoded) } }); 
//             });
        
//             if (!exUser) return res.json({ isAuth: false, error: true });
//             req.token = token;
//             req.user = exUser;
//         } catch (error) {
//             console.log(error);
//             next(error);
//         }
//         next();
//     }
 
// }
import { NotFoundError, UnauthorizedError } from 'routing-controllers';
import { EntityManager, getManager } from 'typeorm';
import { User } from '../entity/User';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export async function checkCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers["authorization"];
        
        if (!token)
            throw new UnauthorizedError('token이 전달되지 않았습니다.');
        
        const decoded: any = await jwt.verify(token, String(process.env.JWT_SECRET_KEY));

        let socialId;
        for (const key in decoded) 
            if (key === 'socialId') 
                socialId = decoded.socialId;

        const entityManager: EntityManager = getManager();
        const user = await entityManager.findOne(User, { where: { socialId }});
        
        if (!user) 
            throw new NotFoundError('해당 사용자를 찾을 수 없습니다.');

        req.currentUser = user;
        next();
    } catch (error) {
        console.error(error);
        next(new UnauthorizedError('token이 유효하지 않습니다.'));
    }
}
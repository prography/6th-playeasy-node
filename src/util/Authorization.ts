import { Action } from 'routing-controllers';
import { EntityManager, getManager } from 'typeorm';
import { User } from '../entity/User'
import jwt from 'jsonwebtoken';

export async function currentUserChecker(action: Action) {
    const token: string = action.request.headers["authorization"];
    const decoded: any = await jwt.verify(token, String(process.env.JWT_SECRET_KEY));
    
    let socialId;
    for (const key in decoded) 
        if (key === 'socialId') 
            socialId = decoded.socialId;

    const entityManager: EntityManager = getManager();
    const user: User | undefined = await entityManager.findOne(User, { where: { socialId }});

    return user;
}

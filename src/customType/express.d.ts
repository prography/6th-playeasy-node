import { User } from '../entity/User';
import { Match } from '../entity/Match';

declare global {
    namespace Express {
        interface Request {
            currentUser: User,
        }
    }
}
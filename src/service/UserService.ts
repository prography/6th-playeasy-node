import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions'
import { UserRepository } from '../repository/UserRepository';
import { User } from '../entity/User';

@Service()
export class UserService {
    constructor(@InjectRepository() private userRepository: UserRepository) {}

    public async getUser(email: string) {
        
    }

    
    public async updateUser(userId: string) {
        
    }
}

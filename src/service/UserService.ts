import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions'
import { UserRepository } from '../repository/UserRepository';
import { User } from '../entity/User';
import jwt from 'jsonwebtoken';

@Service()
export class UserService {
    constructor(@InjectRepository() private userRepository: UserRepository) {}

    public async login(email: string) {
        let isNewMember: boolean = false;
        const exUser = await this.userRepository.findOne({ where: { email }});
        console.log(exUser);
        if (exUser === undefined) {
            isNewMember = true;
            const user: User = new User();
            user.email = email;
            user.socialType = 'kakao';
            await this.userRepository.save(user);
        }
        
        const token = await jwt.sign({email: email}, String(process.env.JWT_SECRET_KEY), {expiresIn : "7d"});

        return { isNewMember, token }
    }

    public async getUser(email: string) {
        
    }

    
    public async updateUser(userId: string) {
        
    }
}

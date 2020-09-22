import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions'
import { UserRepository } from '../repository/UserRepository';
import { User } from '../entity/User';
import jwt from 'jsonwebtoken';
import { BadRequestError } from 'routing-controllers';

@Service()
export class AuthService {
    constructor(@InjectRepository() private userRepository: UserRepository) {}

    public async login(email: string) {
        let isNewMember: boolean = false;
        const exUser: User | undefined = await this.userRepository.findOne({ where: { email }});
        if (!exUser) {
            isNewMember = true;
            const user: User = new User();
            user.email = email;
            user.socialType = 'kakao';
            await this.userRepository.save(user);
        }
        
        const token: string = await jwt.sign({email: email}, String(process.env.JWT_SECRET_KEY), {expiresIn : "7d"});

        return { isNewMember, token }
    }
}

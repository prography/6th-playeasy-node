import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from '../repository/UserRepository';
import { User } from '../entity/User';
import { UpdateUserDto, ResponseUserDto } from '../dto/UserDto';
import { plainToClass } from 'class-transformer';

@Service()
export class UserService {
    constructor(@InjectRepository() private userRepository: UserRepository) {}

    public async updateUser(user: User, updateUserDto: UpdateUserDto) {
        user.name = updateUserDto.name;
        user.age = updateUserDto.age;
        user.level = updateUserDto.level;
        user.description = updateUserDto.description;
        user.picture = updateUserDto.picture;
        user.phone = updateUserDto.phone;

        const updatedUser: User = await this.userRepository.save(user);
        const responseUserDto: ResponseUserDto = plainToClass(ResponseUserDto, updatedUser);

        return responseUserDto;
    }
}

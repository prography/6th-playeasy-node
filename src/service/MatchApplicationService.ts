import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { MatchApplicationRepository } from '../repository/MatchApplicationRepository';
import { plainToClass } from 'class-transformer';
import { NotFoundError } from 'routing-controllers';
import { ApplicationStatus, ApplicationType } from '../util/Enums';
import { User } from '../entity/User';
import { 
    CreateMatchApplicationDto, 
    UpdateMatchApplicationDto, 
    ResponseMatchApplicationDto 
} from '../dto/MatchApplicationDto';

@Service()
export class MatchApplicationService {
    constructor(@InjectRepository() private matchApplicationRepository: MatchApplicationRepository) {}

    public async add(user: User, createMatchApplicationDto: CreateMatchApplicationDto) {

    }

    public async getList(matchId: number) {

    }

    public async update(updateMatchApplicationDto: UpdateMatchApplicationDto) {

    }

    public async cancel(updateMatchApplicationDto: UpdateMatchApplicationDto) {

    }
}
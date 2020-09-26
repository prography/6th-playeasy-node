import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { MatchRepository } from '../repository/MatchRepository';
import { Match } from '../entity/Match';
import { CreateMatchDto, UpdateMatchDto, ResponseMatchDto } from '../dto/MatchDto';
import { plainToClass } from 'class-transformer';

@Service()
export class MatchService {
    constructor(@InjectRepository() private matchRepository: MatchRepository) {}

    public async createMatch() {

    }

    public async updateMatch() {

    }

    
}
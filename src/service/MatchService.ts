import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { MatchRepository } from '../repository/MatchRepository';
import { Match } from '../entity/Match';
import { CreateMatchDto, UpdateMatchDto, ResponseMatchDto } from '../dto/MatchDto';
import { CreateLocationDto } from '../dto/LocationDto';
import { plainToClass } from 'class-transformer';

@Service()
export class MatchService {
    constructor(@InjectRepository() private matchRepository: MatchRepository) {}

    public async add(createMatchDto: CreateMatchDto, createLocationDto: CreateLocationDto) {

    }

    public async getOne(matchId: number) {

    }

    public async getList(date: string, status: string) {

    }

    public async update(updateMatchDto: UpdateMatchDto, updateLocationDto: UpdateMatchDto) {

    }

    public async updateStatus(matchId: number, status: string) {

    }    
}
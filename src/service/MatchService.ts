import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { MatchRepository } from '../repository/MatchRepository';
import { Match } from '../entity/Match';
import { Location } from '../entity/Location';
import { CreateMatchDto, UpdateMatchDto, ResponseMatchDto } from '../dto/MatchDto';
import { CreateLocationDto } from '../dto/LocationDto';

@Service()
export class MatchService {
    constructor(@InjectRepository() private matchRepository: MatchRepository) {}

    public async add(createMatchDto: CreateMatchDto, createLocationDto: CreateLocationDto) {
        const match: Match = new Match();
        match.type = createMatchDto.type;
        match.description = createMatchDto.description;
        match.startAt = createMatchDto.startAt;
        match.endAt = createMatchDto.endAt;
        match.fee = createMatchDto.fee;
        match.phone = createMatchDto.phone;
        match.quota = createMatchDto.quota;
        match.status = createMatchDto.status;

        const location: Location = new Location();
        location.address = createLocationDto.address;
        location.detail = createLocationDto.detail;

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
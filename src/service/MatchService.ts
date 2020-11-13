import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { MatchRepository } from '../repository/MatchRepository';
import { LocationRepository } from '../repository/LocationRepository';
import { Match } from '../entity/Match';
import { Location } from '../entity/Location';
import { CreateMatchDto, UpdateMatchDto, ResponseMatchDto } from '../dto/MatchDto';
import { User } from '../entity/User';
import { plainToClass } from 'class-transformer';
import { NotFoundError } from 'routing-controllers';
import { MatchStatus } from '../util/Enums';
import { Between } from 'typeorm';

@Service()
export class MatchService {
    constructor(@InjectRepository() private matchRepository: MatchRepository,
                @InjectRepository() private locationRepository: LocationRepository) {}

    public async add(user: User, createMatchDto: CreateMatchDto) {   
        let match: Match = new Match();
        match.type = createMatchDto.type;
        match.description = createMatchDto.description;
        match.startAt = new Date(createMatchDto.startAt);
        match.endAt = new Date(createMatchDto.endAt);
        match.fee = createMatchDto.fee;
        match.phone = createMatchDto.phone;
        match.quota = createMatchDto.quota;
        match.status = MatchStatus.WAITING;

        let location: Location = new Location();
        location.address = createMatchDto.address;
        location.detail = createMatchDto.addressDetail;
        location = await this.locationRepository.save(location);

        match.location = location;  // match - location
        match.user = user;  // match - user

        match = await this.matchRepository.save(match);
        const respneseMatchDto: ResponseMatchDto = plainToClass(ResponseMatchDto, match);
        
        return respneseMatchDto;
    }

    public async getOne(matchId: number) {
        const match = await this.matchRepository.findOne({
            relations: ["location"],
            where: { id: matchId }
        });
        
        if (!match) 
            throw new NotFoundError('해당 Match를 찾을 수 없습니다.');
        
        const responseMatchDto: ResponseMatchDto = plainToClass(ResponseMatchDto, match);

        return responseMatchDto;
    }

    public async getList(date: string) {
        const checkedDate: Date = new Date(date);

        if (checkedDate.toString() === "Invalid Date")
            throw new NotFoundError("유효하지 않은 값입니다.");
            
        const start: Date = new Date(date + "T00:00:00");
        const end: Date = new Date(date + "T23:59:59");

        const matchList: Match[] = await this.matchRepository.find({
            relations: ["location"],
            where: [
                { startAt: Between(start, end) }
            ]
        });

        const matchDtos: ResponseMatchDto[] = [];
        matchList.forEach(match => {
            matchDtos.push(plainToClass(ResponseMatchDto, match));
        });

        return matchDtos;
    }

    public async update(user: User, updateMatchDto: UpdateMatchDto) {
        let match = await this.matchRepository.findOne({
            relations: ["location"],
            where: { 
                id: updateMatchDto.id, 
                user,
            }
        });

        if (!match) 
            throw new NotFoundError('해당 Match를 찾을 수 없습니다.');
        
        match.type = updateMatchDto.type;
        match.description = updateMatchDto.description;
        match.startAt = new Date(updateMatchDto.startAt);
        match.endAt = new Date(updateMatchDto.endAt);
        match.fee = updateMatchDto.fee;
        match.phone = updateMatchDto.phone;
        match.quota = updateMatchDto.quota;

        let location = await this.locationRepository.findOne({ id: match.location.id });

        if (!location) 
            throw new NotFoundError('해당 장소를 찾을 수 없습니다.');

        location.address = updateMatchDto.address;
        location.detail = updateMatchDto.addressDetail;
        location = await this.locationRepository.save(location);
        match.location = location;  // match - location

        match = await this.matchRepository.save(match);
        const respneseMatchDto: ResponseMatchDto = plainToClass(ResponseMatchDto, match);
        
        return respneseMatchDto;
    }

    public async updateStatus(user: User, updateMatchDto: UpdateMatchDto) {
        let match = await this.matchRepository.findOne({
            relations: ["location"],
            where: { 
                id: updateMatchDto.id, 
                user,
            }
        });
        
        if (!match) 
            throw new NotFoundError('해당 Match를 찾을 수 없습니다.');

        match.status = updateMatchDto.status;

        match = await this.matchRepository.save(match);
        const respneseMatchDto: ResponseMatchDto = plainToClass(ResponseMatchDto, match);
        
        return respneseMatchDto; 
    }    
}
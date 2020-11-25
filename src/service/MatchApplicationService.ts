import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { MatchApplicationRepository } from '../repository/MatchApplicationRepository';
import { plainToClass } from 'class-transformer';
import { ForbiddenError, NotFoundError } from 'routing-controllers';
import { User } from '../entity/User';
import { 
    CreateMatchApplicationDto, 
    UpdateMatchApplicationDto, 
    ResponseMatchApplicationDto 
} from '../dto/MatchApplicationDto';
import { MatchApplication } from '../entity/MatchApplication';
import { MatchRepository } from '../repository/MatchRepository';
import { ApplicationType } from '../utils/Enums';
import { ResponseUserDto } from '../dto/UserDto';
import { ResponseMatchDto } from '../dto/MatchDto';

@Service()
export class MatchApplicationService {
    constructor(@InjectRepository() private matchApplicationRepository: MatchApplicationRepository,
                @InjectRepository() private matchRepository: MatchRepository) {}

    public async add(user: User, createMatchApplicationDto: CreateMatchApplicationDto) {
        let matchApplication: MatchApplication = new MatchApplication();
        matchApplication.quota = createMatchApplicationDto.quota;
        matchApplication.type = createMatchApplicationDto.type;
        matchApplication.user = user;
        
        const match = await this.matchRepository.findOne({
            relations: ["user"],
            where: { id: createMatchApplicationDto.matchId }
        });

        if (!match)
            throw new NotFoundError('해당 Match를 찾을 수 없습니다.');
        if (match.user.id === user.id)
            throw new ForbiddenError('자신이 등록한 매치에 신청할 수 없습니다.');
        
        matchApplication.match = match;
        matchApplication = await this.matchApplicationRepository.save(matchApplication);
        
        const applicationDto = plainToClass(ResponseMatchApplicationDto, matchApplication);
        applicationDto.user = plainToClass(ResponseUserDto, user);
        applicationDto.match = plainToClass(ResponseMatchDto, match);

        return applicationDto;
    }

    public async getListByMatch(matchId: number) {
        const applicationList: MatchApplication[] = await this.matchApplicationRepository.find({
            relations: ["user", "match"],
            where: { match: matchId }
        });
        
        const applicationDtos: ResponseMatchApplicationDto[] = [];
        applicationList.forEach(matchApplication => {
            const applicationDto = plainToClass(ResponseMatchApplicationDto, matchApplication);
            applicationDto.user = plainToClass(ResponseUserDto, matchApplication.user);
            applicationDto.match = plainToClass(ResponseMatchDto, matchApplication.match);
            
            applicationDtos.push(applicationDto);
        });

        return applicationDtos;
    }

    public async getListByUser(user: User, type: ApplicationType) {
        const applicationList: MatchApplication[] = await this.matchApplicationRepository.find({
            relations: ["user", "match"],
            where: { user, type }
        });

        const applicationDtos: ResponseMatchApplicationDto[] = [];
        applicationList.forEach(matchApplication => {
            const applicationDto = plainToClass(ResponseMatchApplicationDto, matchApplication);
            applicationDto.user = plainToClass(ResponseUserDto, matchApplication.user);
            applicationDto.match = plainToClass(ResponseMatchDto, matchApplication.match);
            
            applicationDtos.push(applicationDto);
        });

        return applicationDtos;
    }

    public async update(updateMatchApplicationDto: UpdateMatchApplicationDto) {
        let application = await this.matchApplicationRepository.findOne({
            relations: ["user", "match"],
            where: { 
                id: updateMatchApplicationDto.applicationId,
            },
        });
        
        if (!application)
            throw new NotFoundError('해당 신청을 찾을 수 없습니다.');
        
        application.status = updateMatchApplicationDto.status;
        const updatedApplication = await this.matchApplicationRepository.save(application);
    
        const applicationDto = plainToClass(ResponseMatchApplicationDto, updatedApplication);
        applicationDto.user = plainToClass(ResponseUserDto, updatedApplication.user);
        applicationDto.match = plainToClass(ResponseMatchDto, updatedApplication.match);

        return applicationDto;
    }
}
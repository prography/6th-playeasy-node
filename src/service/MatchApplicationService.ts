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
        
        matchApplication.match = match
        matchApplication = await this.matchApplicationRepository.save(matchApplication);
        
        return plainToClass(ResponseMatchApplicationDto, matchApplication);
    }

    public async getListByMatch(matchId: number) {
        const applicationList: MatchApplication[] = await this.matchApplicationRepository.find({
            relations: ["user"],
            where: { match: matchId }
        });
        
        const applicationDtos: ResponseMatchApplicationDto[] = [];
        applicationList.forEach(application => {
            applicationDtos.push(plainToClass(ResponseMatchApplicationDto, application));
        });

        return applicationDtos;
    }

    public async getListByUser(user: User, type: ApplicationType) {
        const applicationList: MatchApplication[] = await this.matchApplicationRepository.find({
            relations: ["user"],
            where: { user, type }
        });

        const applicationDtos: ResponseMatchApplicationDto[] = [];
        applicationList.forEach(application => {
            applicationDtos.push(plainToClass(ResponseMatchApplicationDto, application));
        });

        return applicationDtos;
    }

    public async update(user: User, updateMatchApplicationDto: UpdateMatchApplicationDto) {
        let application = await this.matchApplicationRepository.findOne({
            relations: ["user", "match"],
            where: { 
                id: updateMatchApplicationDto.applicationId,
                user: user.id
            },
        });
        
        if (!application)
            throw new NotFoundError('해당 신청을 찾을 수 없습니다.');
        
        application.status = updateMatchApplicationDto.status;
        const updatedApplication = await this.matchApplicationRepository.save(application);
    
        return plainToClass(ResponseMatchApplicationDto, updatedApplication);
    }
}
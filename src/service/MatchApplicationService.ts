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
import { MatchApplication } from '../entity/MatchApplication';
import { MatchRepository } from '../repository/MatchRepository';
import { Match } from '../entity/Match';

@Service()
export class MatchApplicationService {
    constructor(@InjectRepository() private matchApplicationRepository: MatchApplicationRepository,
                @InjectRepository() private matchRepository: MatchRepository) {}

    public async add(user: User, createMatchApplicationDto: CreateMatchApplicationDto) {
        let matchApplication: MatchApplication = new MatchApplication();
        matchApplication.quota = createMatchApplicationDto.quota;
        matchApplication.type = createMatchApplicationDto.type;
        matchApplication.user = user;
        const match: Match | undefined = await this.matchRepository.findOne({ id: createMatchApplicationDto.matchId });
        if (!match)
            throw new NotFoundError('해당 Match를 찾을 수 없습니다.');
        matchApplication.match = match;

        matchApplication = await this.matchApplicationRepository.save(matchApplication);
        
        return plainToClass(ResponseMatchApplicationDto, matchApplication);
    }

    public async getList(matchId: number) {

    }

    public async update(updateMatchApplicationDto: UpdateMatchApplicationDto) {

    }

    public async cancel(updateMatchApplicationDto: UpdateMatchApplicationDto) {

    }
}
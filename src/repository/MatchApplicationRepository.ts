import { EntityRepository, Repository } from 'typeorm';
import { MatchApplication } from '../entity/MatchApplication';

@EntityRepository(MatchApplication)
export class MatchApplicationRepository extends Repository<MatchApplication> {
    
}
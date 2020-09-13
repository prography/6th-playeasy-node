import { EntityRepository, Repository } from 'typeorm';
import { Match } from '../entity/Match';

@EntityRepository(Match)
export class MatchRepository extends Repository<Match> {
    
}
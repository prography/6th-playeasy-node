import { EntityRepository, Repository } from 'typeorm';
import { Location } from '../entity/Location';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {
    
}
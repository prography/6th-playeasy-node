import { 
    IsInt, 
    IsNotEmpty,
    IsString,
    IsEnum,
    IsMobilePhone, 
    IsDate,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { MatchStatus, MatchType } from '../util/Enums';

export class CreateLocationDto {
    @IsString()
    name!: string;

    @IsString()
    address!: string;

    @IsString()
    detail!: string;
}

export class UpdateLocationDto {
    
}

export class ResponseLocationDto {

}
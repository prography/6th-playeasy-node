import { 
    IsInt, 
    IsNotEmpty,
    IsString,
    IsEnum,
    IsMobilePhone, 
    IsDateString,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { MatchStatus, MatchType } from '../utils/Enums';
import { Location } from '../entity/Location';

export class CreateMatchDto {
    @IsEnum(MatchType)
    public type!: MatchType;

    @IsString()
    public description!: string;
    
    @IsDateString()
    public startAt!: string;
    
    @IsDateString()
    public endAt!: string;
    
    @IsInt()
    public fee!: number;
    
    @IsMobilePhone("ko-KR")
    public phone!: string;

    @IsInt()
    public quota!: number;

    @IsInt()
    public mapId!: number;

    @IsString()
    public placeName!: string;

    @IsString()
    public addressName!: string;

    @IsString()
    public placeDetail!: string;
}

export class UpdateMatchDto {
    @IsNotEmpty()
    public id!: number;

    @IsEnum(MatchType)
    public type!: MatchType;

    @IsString()
    public description!: string;
    
    @IsDateString()
    public startAt!: string;
    
    @IsDateString()
    public endAt!: string;

    @IsInt()
    public fee!: number;

    @IsMobilePhone("ko-KR")
    public phone!: string;
    
    @IsInt()
    public quota!: number;

    @IsInt()
    public mapId!: number;

    @IsString()
    public placeName!: string;

    @IsString()
    public addressName!: string;

    @IsString()
    public placeDetail!: string;
}

@Exclude()
export class ResponseMatchDto {
    @Expose()
    @IsNotEmpty()
    id!: number;

    @Expose()
    public type!: MatchType;
    
    @Expose()
    public description!: string;
    
    @Expose()
    public startAt!: Date;

    @Expose()
    public endAt!: Date;
    
    @Expose()
    public fee!: number;
    
    @Expose()
    public phone!: string;
    
    @Expose()
    public quota!: number;
    
    @Expose()
    public status!: MatchStatus;

    @Expose()
    public location!: Location;

    @Expose()
    public teamName!: string;
}
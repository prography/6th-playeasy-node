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

export class CreateMatchDto {
    @IsEnum(MatchType)
    public type!: MatchType;

    @IsString()
    public description!: string;
    
    @IsDate()
    public startAt!: Date;
    
    @IsDate()
    public endAt!: Date;
    
    @IsInt()
    public fee!: number;
    
    @IsMobilePhone("ko-KR")
    public phone!: string;

    @IsInt()
    public quota!: number;
    
    @IsEnum(MatchStatus)
    public status!: MatchStatus;
}

export class UpdateMatchDto {
    @IsNotEmpty()
    public id!: number;

    @IsEnum(MatchType)
    public type!: MatchType;

    @IsString()
    public description!: string;
    
    @IsDate()
    public startAt!: Date;
    
    @IsDate()
    public endAt!: Date;

    @IsInt()
    public fee!: number;

    @IsMobilePhone("ko-KR")
    public phone!: string;
    
    @IsInt()
    public quota!: number;
}

export class UpdateMatchStatusDto {
    @IsInt()
    @IsNotEmpty()
    public id!: number;

    @IsEnum(MatchStatus)
    @IsNotEmpty()
    public status!: MatchStatus;
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
}
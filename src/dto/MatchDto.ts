import { 
    IsInt, 
    IsNotEmpty,
    Min,
    Max,
    IsString,
    IsEnum,
    IsMobilePhone
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { MatchStatus, MatchType } from '../util/Enums';

export class CreateMatchDto {
    public type!: MatchType;
    public description!: string;
    public startAt!: Date;
    public duration!: number;
    public fee!: number;
    public phone!: string;
    public quota!: number;
    public status!: MatchStatus;
}

export class UpdateMatchDto {
    public id!: number;
    public type!: MatchType;
    public description!: string;
    public startAt!: Date;
    public duration!: number;
    public fee!: number;
    public phone!: string;
    public quota!: number;
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
    public duration!: number;
    
    @Expose()
    public fee!: number;
    
    @Expose()
    public phone!: string;
    
    @Expose()
    public quota!: number;
    
    @Expose()
    public status!: MatchStatus;
}
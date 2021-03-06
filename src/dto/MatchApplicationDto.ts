import { 
    IsInt, 
    IsNotEmpty,
    IsEnum,
    Min,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApplicationStatus, ApplicationType } from '../utils/Enums';
import { ResponseUserDto } from './UserDto';
import { ResponseMatchDto } from './MatchDto';

export class CreateMatchApplicationDto {
    @IsInt()
    @Min(1)
    quota!: number;

    @IsEnum(ApplicationType)
    type!: ApplicationType;

    @IsInt()
    matchId!: number;
}

export class UpdateMatchApplicationDto {
    @IsNotEmpty()
    applicationId!: number;

    @IsEnum(ApplicationStatus)
    status!: ApplicationStatus;
}

@Exclude()
export class ResponseMatchApplicationDto {
    @Expose()
    @IsNotEmpty()
    id!: number;

    @Expose()
    quota!: number;

    @Expose()
    type!: ApplicationType;

    @Expose()
    status!: ApplicationStatus;

    @Expose()
    user!: ResponseUserDto;

    @Expose()
    match!: ResponseMatchDto;
}
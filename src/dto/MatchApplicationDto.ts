import { 
    IsInt, 
    IsNotEmpty,
    IsEnum,
    Min,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApplicationStatus, ApplicationType } from '../util/Enums';
import { User } from '../entity/User';

export class CreateMatchApplicationDto {
    @IsInt()
    @Min(1)
    quota!: number;

    @IsEnum(ApplicationType)
    type!: ApplicationType;

    @IsEnum(ApplicationStatus)
    status!: ApplicationStatus;
}

export class UpdateMatchApplicationDto {
    @IsInt()
    @Min(1)
    quota!: number;

    @IsEnum(ApplicationType)
    type!: ApplicationType;

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
    user!: User;
}
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
import { Level } from '../entity/User';

export class UpdateUserDto {
    public name!: string;
    
    @IsInt()
    @Min(1)
    @Max(100)
    public age!: number;

    @IsMobilePhone("ko-KR")
    public phone!: string;

    @IsEnum(Level)
    public level!: Level;

    @IsString()
    public description!: string;

    public picture!: string;
}

@Exclude()
export class ResponseUserDto {
    @Expose()
    @IsNotEmpty()
    public id!: number;
    
    @Expose()
    public name!: string;
    
    @Expose()
    public age!: number;

    @Expose()
    @IsNotEmpty()
    public email!: string;

    @Expose()
    public phone!: string;
    
    @Expose()
    public socialType!: string;

    @Expose()
    public level!: string;

    @Expose()
    public description!: string;

    @Expose()
    public picture!: string;
}
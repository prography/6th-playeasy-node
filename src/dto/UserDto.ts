import { 
    IsInt, 
    IsNotEmpty,
    Min,
    Max,
    IsString,
    IsMobilePhone,
    IsEmail,
    Length
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class UpdateUserDto {
    @Length(1, 20)
    public name!: string;
    
    @IsInt()
    @Min(1)
    @Max(100)
    public age!: number;

    @IsEmail()
    public email!: string;

    @IsMobilePhone("ko-KR")
    public phone!: string;

    @IsString()
    public description!: string;

    public picture!: string;

    public teamName!: string;
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
    public description!: string;

    @Expose()
    public teamName!: string;
}
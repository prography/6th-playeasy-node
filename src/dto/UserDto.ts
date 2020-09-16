import { isNotEmpty, Length, IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../entity/User';

export class ResponseUserDto {
    @IsNotEmpty()
    private id!: number;
    
    private name!: string;
    
    private age!: number;

    @IsNotEmpty()
    @IsEmail()
    private email!: string;

    private socialType!: string;

    private level!: string;

    private description!: string;

    private picture!: string;
}
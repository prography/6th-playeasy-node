import { IsEmail, IsNotEmpty,  } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty()
    private id!: number;
    
    private name!: string;
    
    private age!: number;

    private level!: string;

    private description!: string;

    private picture!: string;
}

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
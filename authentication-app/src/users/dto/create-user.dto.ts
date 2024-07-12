import { IsEmail, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    bio?: string;

    @IsNumber()
    phone: number;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    photo: string;
}

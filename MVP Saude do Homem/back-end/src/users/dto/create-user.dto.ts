
import { IsEmail, IsNumber, IsString, MinLength, IsOptional, Matches, MaxLength, MinLength as MinLen } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLen(3)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9_]+$/, { message: 'username só pode conter letras, números e _' })
    username: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsOptional()
    @IsNumber()
    height?: number;

    @IsOptional()
    @IsNumber()
    weight?: number;

    @IsOptional()
    @IsNumber()
    age?: number;
}
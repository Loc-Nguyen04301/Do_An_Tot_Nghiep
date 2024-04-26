import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
export class UpdateAuthDto {
    @IsString()
    username?: string;

    @IsString()
    avatar?: string
}

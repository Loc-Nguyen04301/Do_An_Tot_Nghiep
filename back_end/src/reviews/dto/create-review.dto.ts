import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsNumber, IsEnum, isArray, IsArray } from 'class-validator';

export class CreateReviewDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    star: number;

    @ApiProperty()
    image: string[];

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    product_id: number;
}
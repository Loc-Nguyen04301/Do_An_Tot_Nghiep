import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsOptional, IsString, } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    brand: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    description?: string

    @IsNotEmpty()
    @IsInt()
    old_price: number;

    @IsNotEmpty()
    @IsInt()
    new_price: number

    @IsNotEmpty()
    @IsString()
    image: string

    @IsOptional()
    available?: number

    @IsInt({ each: true })
    @IsArray()
    category_ids?: number[]
}

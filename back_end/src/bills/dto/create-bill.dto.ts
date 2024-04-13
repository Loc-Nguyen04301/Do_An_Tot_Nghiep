import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';

class ShortCartItem {
    @IsNumber()
    @IsNotEmpty()
    product_id: number

    @IsNumber()
    @IsNotEmpty()
    quantity: number
}

export class CreateBillDto {
    @IsString()
    @IsNotEmpty()
    customer_name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    note: string

    @IsNumber()
    user_id: number

    shortCartItems: ShortCartItem[]
}

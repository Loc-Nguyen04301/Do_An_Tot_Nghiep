import { IsNotEmpty, IsString, IsEmail, IsNumber, IsEnum } from 'class-validator';
import { PaymentMethod } from '@prisma/client';

class ShortCartItem {
    @IsNumber()
    @IsNotEmpty()
    product_id: number

    @IsNumber()
    @IsNotEmpty()
    quantity: number

    total_price: number
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

    user_id?: any

    @IsEnum(PaymentMethod)
    @IsNotEmpty()
    payment_method: PaymentMethod

    total_amount?: number

    shortCartItems: ShortCartItem[]
}

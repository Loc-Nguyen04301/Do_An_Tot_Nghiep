import { IsNotEmpty, IsString, IsEmail, IsNumber, IsEnum, IsBoolean } from 'class-validator';
import { OrderStatus, PaymentMethod } from '@prisma/client';

class ShortCartItem {
    @IsNumber()
    @IsNotEmpty()
    product_id: number

    @IsNumber()
    @IsNotEmpty()
    quantity: number

    price: number

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

    email: string;

    @IsString()
    note: string

    user_id?: any

    @IsEnum(PaymentMethod)
    @IsNotEmpty()
    payment_method: PaymentMethod

    order_status?: OrderStatus

    payment_status?: boolean

    total_amount?: number

    shortCartItems: ShortCartItem[]
}

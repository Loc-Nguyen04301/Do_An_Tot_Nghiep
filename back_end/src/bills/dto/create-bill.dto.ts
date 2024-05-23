import { IsNotEmpty, IsString, IsEmail, IsNumber, IsEnum, IsBoolean } from 'class-validator';
import { OrderStatus, PaymentMethod } from '@prisma/client';

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

    @IsEnum(OrderStatus)
    @IsNotEmpty()
    order_status?: OrderStatus

    @IsBoolean()
    @IsNotEmpty()
    payment_status?: boolean

    total_amount?: number

    shortCartItems: ShortCartItem[]
}

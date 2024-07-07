import { IsNumber, IsString } from 'class-validator';

export class CreateBillShippingDto {
    @IsNumber()
    bill_id: number

    @IsString()
    ghn_order_code: string
}
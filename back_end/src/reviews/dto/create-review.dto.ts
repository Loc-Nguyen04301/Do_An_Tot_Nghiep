import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
    @ApiProperty()
    description: string;

    @ApiProperty()
    star: number;

    @ApiProperty({ required: false })
    image: string;

    @ApiProperty()
    user_id: number;

    @ApiProperty()
    product_id: number;
}
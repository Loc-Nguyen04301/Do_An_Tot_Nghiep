import { IsString } from "class-validator";

export class CreateSalecampaignDto {
    @IsString()
    name: string

    @IsString()
    from_date: string

    @IsString()
    to_date: string
}

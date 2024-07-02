import { PartialType } from '@nestjs/swagger';
import { CreateSalecampaignDto } from './create-salecampaign.dto';
import { IsBoolean } from 'class-validator';

export class UpdateSalecampaignDto extends PartialType(CreateSalecampaignDto) {
    @IsBoolean()
    active: boolean
}

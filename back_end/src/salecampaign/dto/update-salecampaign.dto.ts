import { PartialType } from '@nestjs/swagger';
import { CreateSaleCampaignDto } from './create-salecampaign.dto';
import { IsBoolean } from 'class-validator';

export class UpdateSaleCampaignDto extends PartialType(CreateSaleCampaignDto) {
    @IsBoolean()
    active: boolean
}

import { Module } from '@nestjs/common';
import { SaleCampaignService } from './salecampaign.service';
import { SaleCampaignController } from './salecampaign.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SaleCampaignController],
  providers: [SaleCampaignService],
  imports: [PrismaModule]
})
export class SaleCampaignModule { }

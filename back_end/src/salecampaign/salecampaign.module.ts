import { Module } from '@nestjs/common';
import { SalecampaignService } from './salecampaign.service';
import { SalecampaignController } from './salecampaign.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SalecampaignController],
  providers: [SalecampaignService],
  imports: [PrismaModule]
})
export class SalecampaignModule { }

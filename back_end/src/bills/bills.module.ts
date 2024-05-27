import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppGateway } from 'src/app.gateway';

@Module({
  controllers: [BillsController],
  providers: [BillsService, AppGateway],
  imports: [PrismaModule]
})
export class BillsModule { }

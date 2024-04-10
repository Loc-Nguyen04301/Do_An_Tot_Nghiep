import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BillsController],
  providers: [BillsService],
  imports: [PrismaModule]
})
export class BillsModule { }

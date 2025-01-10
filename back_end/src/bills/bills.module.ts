import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppGateway } from 'src/app.gateway';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [BillsController],
  providers: [
    BillsService,
    AppGateway,
    MailService
  ],
  imports: [PrismaModule]
})
export class BillsModule { }

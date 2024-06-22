import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, MailService],
  imports: [PrismaModule, JwtModule.register({})],
})
export class AuthModule { }

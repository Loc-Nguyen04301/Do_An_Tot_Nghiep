import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { BillsModule } from './bills/bills.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CategoryModule } from './category/category.module';
import { MailModule } from './mail/mail.module'
import { SaleCampaignModule } from './salecampaign/salecampaign.module';

import { AtGuard, RolesGuard } from './common/guards';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { UserModule } from './user/user.module';
import { MomoPaymentController } from './momo_payment/momo_payment.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    // CacheModule.register({
    //   isGlobal: true,
    //   store: redisStore,
    //   host: process.env.REDIS_HOST,
    //   port: process.env.REDIS_PORT,
    //   username: 'default',
    //   password: 'Mfdt0Cfry7VvxgTYght0dfDFHjJp4T9t',
    //   no_ready_check: true,
    // }),
    // CacheModule.registerAsync({
    //   isGlobal: true,
    //   useFactory: async () => ({
    //     store: await redisStore({
    //       socket: {
    //         host: process.env.REDIS_HOST,
    //         port: parseInt(process.env.REDIS_PORT),
    //       },
    //     }),
    //   }),
    // }),
    PrismaModule,
    AuthModule,
    ProductsModule,
    ReviewsModule,
    BillsModule,
    DashboardModule,
    UserModule,
    CategoryModule,
    MailModule,
    SaleCampaignModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  controllers: [MomoPaymentController],
})
export class AppModule { }

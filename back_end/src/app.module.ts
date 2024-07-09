import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import type { RedisClientOptions } from "redis";

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
import { CacheController } from 'src/cache/cache.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      url: process.env.REDIS_URL,
      ttl: 30,
    }),
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
  controllers: [
    MomoPaymentController,
    CacheController
  ],
})
export class AppModule { }

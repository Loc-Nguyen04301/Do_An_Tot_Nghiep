import { Module } from '@nestjs/common';
// import { CacheModule } from '@nestjs/cache-manager';
// import { redisStore } from 'cache-manager-redis-yet';
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

import { PaymentController } from './payment/payment.controller';

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
    MailModule
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
  controllers: [PaymentController, MomoPaymentController],
})
export class AppModule { }

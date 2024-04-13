import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { ProductsModule } from './products/products.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ReviewsModule } from './reviews/reviews.module';
import { BillsModule } from './bills/bills.module';

@Module({
  imports: [PrismaModule, AuthModule, ProductsModule, ReviewsModule, BillsModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: SuccessInterceptor,
    // }
  ],
})
export class AppModule { }

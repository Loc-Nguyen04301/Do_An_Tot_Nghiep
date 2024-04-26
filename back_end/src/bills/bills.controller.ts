import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseInterceptors, ParseIntPipe, Query } from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { Public } from 'src/common/decorators';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { OrderStatus, ReturnStatus } from '@prisma/client';

@Controller('api/v1/bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  @Post()
  create(@Body() createBillDto: CreateBillDto) {
    return this.billsService.create(createBillDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.billsService.findOne(id);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  @Get()
  findAll(
    @Query('user_id') user_id: string,
    @Query('order_status') order_status: string,
    @Query('payment_status') payment_status: string,
    @Query('return_status') return_status: string,
    @Query('page_index') page_index: string,
    @Query('page_size') page_size: string,
  ) {
    const parsedUserId = parseInt(user_id, 10);
    const parsedOrderStatus = order_status as OrderStatus
    const parsedPaymentStatus = payment_status === 'true';
    const parsedReturnStatus = return_status as ReturnStatus
    const parsedPageIndex = parseInt(page_index, 10);
    const parsedPageSize = parseInt(page_size, 10);

    return this.billsService.findAll({
      user_id: parsedUserId,
      order_status: parsedOrderStatus,
      payment_status: parsedPaymentStatus,
      return_status: parsedReturnStatus,
      page_index: parsedPageIndex,
      page_size: parsedPageSize
    });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
  //   return this.billsService.update(+id, updateBillDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.billsService.remove(+id);
  // }
}

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
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBillDto: UpdateBillDto) {
    console.log({ updateBillDto })
    return this.billsService.update(updateBillDto, id);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  @Get("notification")
  findAllNotification() {
    return this.billsService.findAllNotification()
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  @Patch("isread/:id")
  isReadBill(@Param('id', ParseIntPipe) billId: number) {
    return this.billsService.isReadBill(billId)
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  @Get("findAllAdmin")
  findAllAdmin(
    @Query('customer_name') customer_name: string,
    @Query('address') address: string,
    @Query('phone_number') phone_number: string,
    @Query('order_status') order_status: string,
    @Query('payment_status') payment_status: string,
    @Query('return_status') return_status: string,
    @Query('from_date') from_date: string,
    @Query('to_date') to_date: string,
  ) {
    const parsedOrderStatus = order_status as OrderStatus
    let parsedPaymentStatus: boolean = undefined
    if (payment_status === "true") {
      parsedPaymentStatus = true
    }
    else if (payment_status === "false") {
      parsedPaymentStatus = false
    }
    const parsedReturnStatus = return_status as ReturnStatus
    const parsedFromDate = new Date(from_date)
    const parsedToDate = new Date(to_date)
    parsedToDate.setHours(23, 59, 59, 999)

    return this.billsService.findAllAdmin({
      customer_name: customer_name,
      address: address,
      phone_number: phone_number,
      order_status: parsedOrderStatus,
      payment_status: parsedPaymentStatus,
      return_status: parsedReturnStatus,
      from_date: parsedFromDate,
      to_date: parsedToDate
    });
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
    @Query('from_date') from_date: string,
    @Query('to_date') to_date: string,
  ) {
    const parsedUserId = parseInt(user_id, 10);
    const parsedOrderStatus = order_status as OrderStatus
    let parsedPaymentStatus: boolean = undefined
    if (payment_status === "true") {
      parsedPaymentStatus = true
    }
    else if (payment_status === "false") {
      parsedPaymentStatus = false
    }
    const parsedReturnStatus = return_status as ReturnStatus
    const parsedPageIndex = parseInt(page_index, 10);
    const parsedPageSize = parseInt(page_size, 10);
    const parsedFromDate = from_date ? new Date(from_date) : undefined
    const parsedToDate = to_date ? new Date(to_date) : undefined
    parsedToDate && parsedToDate.setHours(23, 59, 59, 999)

    return this.billsService.findAll({
      user_id: parsedUserId,
      order_status: parsedOrderStatus,
      payment_status: parsedPaymentStatus,
      return_status: parsedReturnStatus,
      page_index: parsedPageIndex,
      page_size: parsedPageSize,
      from_date: parsedFromDate,
      to_date: parsedToDate
    });
  }
}

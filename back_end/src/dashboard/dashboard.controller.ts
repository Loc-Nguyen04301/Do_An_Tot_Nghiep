import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseInterceptors } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { Public } from 'src/common/decorators';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('api/v1/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  @Get('count')
  countDashboard() {
    return this.dashboardService.countDashboard();
  }
  // @Post()
  // create(@Body() createDashboardDto: CreateDashboardDto) {
  //   return this.dashboardService.create(createDashboardDto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.dashboardService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDashboardDto: UpdateDashboardDto) {
  //   return this.dashboardService.update(+id, updateDashboardDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dashboardService.remove(+id);
  // }
}

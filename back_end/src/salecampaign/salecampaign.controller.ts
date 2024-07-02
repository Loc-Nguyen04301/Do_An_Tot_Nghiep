import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { SaleCampaignService } from './salecampaign.service';
import { CreateSaleCampaignDto } from './dto/create-salecampaign.dto';
import { UpdateSaleCampaignDto } from './dto/update-salecampaign.dto';
import { Public } from 'src/common/decorators';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('api/v1/salecampaign')
export class SaleCampaignController {
  constructor(private readonly salecampaignService: SaleCampaignService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  @Post()
  create(@Body() createSalecampaignDto: CreateSaleCampaignDto) {
    return this.salecampaignService.create(createSalecampaignDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  @Get()
  findAll() {
    return this.salecampaignService.findAll();
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  @Get('/only')
  getOnlyCampaignActive() {
    return this.salecampaignService.getOnlyCampaignActive();
  }


  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  @Post('/active/:id')
  activeCampaign(@Param('id', ParseIntPipe) id: number) {
    return this.salecampaignService.activeCampaign(id);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  @Delete('/delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.salecampaignService.remove(+id);
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.salecampaignService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSalecampaignDto: UpdateSalecampaignDto) {
  //   return this.salecampaignService.update(+id, updateSalecampaignDto);
  // }

}

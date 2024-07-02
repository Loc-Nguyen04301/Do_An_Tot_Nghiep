import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseInterceptors } from '@nestjs/common';
import { SaleCampaignService } from './salecampaign.service';
import { CreateSaleCampaignDto } from './dto/create-salecampaign.dto';
import { UpdateSaleCampaignDto } from './dto/update-salecampaign.dto';
import { Public } from 'src/common/decorators';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('salecampaign')
export class SaleCampaignController {
  constructor(private readonly salecampaignService: SaleCampaignService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  @Post()
  create(@Body() createSalecampaignDto: CreateSaleCampaignDto) {
    console.log({ createSalecampaignDto })
    return this.salecampaignService.create(createSalecampaignDto);
  }

  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @UseInterceptors(new SuccessInterceptor())
  // @Get()
  // findAll() {
  //   return this.salecampaignService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.salecampaignService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSalecampaignDto: UpdateSalecampaignDto) {
  //   return this.salecampaignService.update(+id, updateSalecampaignDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.salecampaignService.remove(+id);
  // }
}

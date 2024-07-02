import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseInterceptors } from '@nestjs/common';
import { SalecampaignService } from './salecampaign.service';
import { CreateSalecampaignDto } from './dto/create-salecampaign.dto';
import { UpdateSalecampaignDto } from './dto/update-salecampaign.dto';
import { Public } from 'src/common/decorators';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('salecampaign')
export class SalecampaignController {
  constructor(private readonly salecampaignService: SalecampaignService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  @Post()
  create(@Body() createSalecampaignDto: CreateSalecampaignDto) {
    return this.salecampaignService.create(createSalecampaignDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  @Get()
  findAll() {
    return this.salecampaignService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salecampaignService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalecampaignDto: UpdateSalecampaignDto) {
    return this.salecampaignService.update(+id, updateSalecampaignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salecampaignService.remove(+id);
  }
}

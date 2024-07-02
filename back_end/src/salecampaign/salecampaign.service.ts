import { Injectable } from '@nestjs/common';
import { CreateSaleCampaignDto } from './dto/create-salecampaign.dto';
import { UpdateSaleCampaignDto } from './dto/update-salecampaign.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SaleCampaignService {
  constructor(private prisma: PrismaService) { }

  async create(createSaleCampaignDto: CreateSaleCampaignDto) {
    const campaign = await this.prisma.saleCampaign.create({
      data: {
        ...createSaleCampaignDto,
        active: false
      }
    })
    return campaign
  }

  // async findAll() {
  //   const campaign = await this.prisma.saleCampaign.findMany({ orderBy: "desc" })
  //   return campaign
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} salecampaign`;
  // }

  // update(id: number, updateSalecampaignDto: UpdateSalecampaignDto) {
  //   return `This action updates a #${id} salecampaign`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} salecampaign`;
  // }
}

import { Injectable } from '@nestjs/common';
import { CreateSalecampaignDto } from './dto/create-salecampaign.dto';
import { UpdateSalecampaignDto } from './dto/update-salecampaign.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SalecampaignService {
  constructor(private prisma: PrismaService) { }

  async create(createSalecampaignDto: CreateSalecampaignDto) {
    const campaign = await this.prisma.saleCampaign.create({
      data: createSalecampaignDto
    })
    return campaign
  }

  findAll() {
    const campaign = await this.prisma.saleCampaign.findMany({ orderBy: "desc" })
    return campaign
  }

  findOne(id: number) {
    return `This action returns a #${id} salecampaign`;
  }

  update(id: number, updateSalecampaignDto: UpdateSalecampaignDto) {
    return `This action updates a #${id} salecampaign`;
  }

  remove(id: number) {
    return `This action removes a #${id} salecampaign`;
  }
}

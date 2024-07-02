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

  async findAll() {
    const listCampaigns = await this.prisma.saleCampaign.findMany({ orderBy: { created_at: "desc" } })
    return listCampaigns
  }

  async getOnlyCampaignActive() {
    const campaign = await this.prisma.saleCampaign.findFirst({
      where: {
        active: true
      }
    })

    return campaign
  }

  async activeCampaign(id: number) {
    await this.prisma.$transaction(async (tr) => {
      await tr.saleCampaign.update({
        where: { id: id },
        data: { active: true },
      });

      await tr.saleCampaign.updateMany({
        where: { id: { not: id } },
        data: { active: false },
      });
    })
    return
  }

  async remove(id: number) {
    const campaign = await this.prisma.saleCampaign.delete({
      where: {
        id: id
      }
    })
    return campaign
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} salecampaign`;
  // }

  // update(id: number, updateSalecampaignDto: UpdateSalecampaignDto) {
  //   return `This action updates a #${id} salecampaign`;
  // }


}

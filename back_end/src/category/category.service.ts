import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    const categories = await this.prisma.category.findMany()
    return categories
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const { name, path } = createCategoryDto
    const category = await this.prisma.category.create({
      data: {
        name: name,
        path: path,
      }
    })
    return category
  }
}

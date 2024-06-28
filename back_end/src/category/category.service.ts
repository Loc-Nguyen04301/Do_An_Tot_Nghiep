import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
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
    const categoryExisted = await this.prisma.category.findFirst({
      where: {
        OR: [
          { name: name },
          { path: path }
        ]
      }
    })

    if (categoryExisted) throw new ForbiddenException("Tên hoặc Đường Dẫn URL danh mục đã tồn tài")

    const category = await this.prisma.category.create({
      data: {
        name: name,
        path: path,
      }
    })
    return category
  }
}

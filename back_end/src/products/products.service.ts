import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }
  // create(createProductDto: CreateProductDto) {
  //   return 'This action adds a new product';
  // }

  async findAll() {
    const products = await this.prisma.product.findMany({
      // include: { categories: { select: { name: true } } },
    });
    return products;
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: id },
      // include: { categories: { select: { name: true } } },
    });
    return product;
  }

  async findByCategory(category: string) {
    console.log("a")
    const products = await this.prisma.product.findMany({
      where: {
        categories: {
          some: {
            category: {
              name: category
            }
          }
        }
      }
    })
    return products;
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}

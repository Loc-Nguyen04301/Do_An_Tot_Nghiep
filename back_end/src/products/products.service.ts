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
      select: {
        id: true,
        name: true,
        description: true,
        old_price: true,
        new_price: true,
        image: true,
        categories: { select: { category: { select: { name: true } } } },
        reviews: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                avatar: true,
                username: true
              }
            },
            images: true,
            description: true,
            star: true,
            created_at: true,
          }
        },
        _count: {
          select: {
            reviews: true
          }
        },
      }
    });
    return product;
  }

  async findByCategory(category: string) {
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

  async findByName(name: string) {
    const products = await this.prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive"
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

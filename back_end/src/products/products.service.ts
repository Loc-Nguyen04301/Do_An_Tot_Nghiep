import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
// import { Cache } from 'cache-manager';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class ProductsService {
  constructor(
    // @Inject(CACHE_MANAGER) private cacheService: Cache,
    private prisma: PrismaService,) { }

  async findAll() {
    const products = await this.prisma.product.findMany({
      include: {
        reviews: {
          select: {
            star: true
          }
        },
        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });

    const newProducts = products.map((product) => {
      const totalStars = product.reviews.reduce((sum, review) => sum + review.star, 0);
      const averageRating = totalStars / product.reviews.length || 0;
      delete product.reviews
      delete product.created_at
      delete product.update_at
      return { ...product, averageRating }
    })

    return newProducts;
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        brand: true,
        description: true,
        old_price: true,
        new_price: true,
        image: true,
        available: true,
        categories: { select: { category: { select: { id: true, name: true } } } },
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
      },
      include: {
        reviews: {
          select: {
            star: true
          }
        },
      }
    })

    const newProducts = products.map((product) => {
      const totalStars = product.reviews.reduce((sum, review) => sum + review.star, 0);
      const averageRating = totalStars / product.reviews.length || 0;
      delete product.reviews
      delete product.created_at
      delete product.update_at
      return { ...product, averageRating }
    })

    return newProducts;
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

  async create(createProductDto: CreateProductDto) {
    const { category_ids, name, brand, description, image, new_price, old_price, available } = createProductDto

    const productExisted = await this.prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        }
      }
    })

    if (productExisted.length > 0) throw new ForbiddenException("Có sản phẩm trùng tên trong danh sách. Vui lòng điền tên khác")

    const categoryCreates = category_ids.map(category_id => ({
      category: { connect: { id: category_id } }
    }));

    await this.prisma.product.create({
      data: {
        brand,
        name,
        description,
        image,
        new_price,
        old_price,
        available,
        categories: {
          create: categoryCreates
        }
      }
    })
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { category_ids, name, brand, description, image, new_price, old_price, available } = updateProductDto

    await this.prisma.categoriesOnProducts.deleteMany({ where: { product_id: id } })

    const categoryCreates = category_ids.map(category_id => ({
      category: { connect: { id: category_id } }
    }))

    const product = await this.prisma.product.update({
      where: { id: id },
      data: {
        name,
        brand,
        description,
        image,
        new_price,
        old_price,
        available,
        categories: {
          create: categoryCreates
        }
      }
    })

    return product
  }

  async remove(id: number) {
    await this.prisma.product.delete({ where: { id } })
  }
}

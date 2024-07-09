import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) { }

  async create(createReviewDto: CreateReviewDto) {
    const review = await this.prisma.review.create({
      data: {
        ...createReviewDto,
        active: false
      },
    })
    return review
  }

  async getListReview() {
    const listReview = await this.prisma.review.findMany({
      select: {
        id: true,
        product: {
          select: {
            name: true
          }
        },
        user: {
          select: {
            username: true
          }
        },
        star: true,
        description: true,
        images: true,
        active: true,
        created_at: true
      },
      orderBy: {
        created_at: "desc"
      }
    })

    const transformedReviews = listReview.map(review => ({
      key: review.id,
      product_name: review.product.name,
      user_name: review.user.username,
      star: review.star,
      description: review.description,
      images: review.images,
      active: review.active,
      created_at: review.created_at
    }));
    return transformedReviews
  }

  async getListReviewByProductId(productId: number) {
    const listReview = await this.prisma.review.findMany({
      where: {
        product_id: productId,
        active: true
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            avatar: true,
            username: true,
          }
        },
        images: true,
        description: true,
        star: true,
        created_at: true
      },
      orderBy: {
        created_at: "desc"
      }
    })

    const [all_star, five_star, four_star, three_star, two_star, one_star] = await Promise.all([
      this.prisma.review.count({ where: { product_id: productId, active: true } }),
      this.prisma.review.count({ where: { product_id: productId, star: 5, active: true } }),
      this.prisma.review.count({ where: { product_id: productId, star: 4, active: true } }),
      this.prisma.review.count({ where: { product_id: productId, star: 3, active: true } }),
      this.prisma.review.count({ where: { product_id: productId, star: 2, active: true } }),
      this.prisma.review.count({ where: { product_id: productId, star: 1, active: true } }),
    ])
    const average_rating = (5 * five_star + 4 * four_star + 3 * three_star + 2 * two_star + 1 * one_star) / all_star

    return { listReview, all_star, five_star, four_star, three_star, two_star, one_star, average_rating }
  }

  async blockReview(ids: number[]) {
    if (ids.length > 0) {
      const updateReviews = await this.prisma.review.updateMany({
        where: {
          id: {
            in: ids
          }
        },
        data: {
          active: false
        }
      })

      if (!updateReviews) throw new BadRequestException('Lỗi cập nhật đánh giá');
    }
    else {
      throw new BadRequestException('Không có danh sách ids đánh giá');
    }
  }

  async activeReview(id: number) {
    const updateReview = await this.prisma.review.update({
      where: { id },
      data: {
        active: true
      }
    })
    return updateReview
  }
}

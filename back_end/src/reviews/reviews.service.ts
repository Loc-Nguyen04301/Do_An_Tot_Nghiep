import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) { }

  async create(createReviewDto: CreateReviewDto) {
    const review = await this.prisma.review.create({ data: createReviewDto })
    return review
  }

  async getListReviewByProductId(productId: number) {
    const listReview = await this.prisma.review.findMany({
      where: {
        product_id: productId
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
      }
    })

    return listReview
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} review`;
  // }

  // update(id: number, updateReviewDto: UpdateReviewDto) {
  //   return `This action updates a #${id} review`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} review`;
  // }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { AtGuard } from 'src/common/guards';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { Public } from 'src/common/decorators';

@Controller('api/v1/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor('Review Success'))
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor('Review Success'))
  @Get('/list')
  getListReview() {
    return this.reviewsService.getListReview();
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor('Review Success'))
  @Get('/list/:productId')
  getListReviewByProductId(@Param('productId', ParseIntPipe) productId: number) {
    return this.reviewsService.getListReviewByProductId(productId);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor('Review Success'))
  @Post('/list/block')
  blockReview(@Body() { ids }: { ids: number[] }) {
    return this.reviewsService.blockReview(ids);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor('Review Success'))
  @Patch('/active/:id')
  activeReview(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.activeReview(id);
  }
}

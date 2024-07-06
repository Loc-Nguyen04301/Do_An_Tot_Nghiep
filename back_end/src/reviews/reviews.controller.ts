import {
  Controller, Get, Post, Body, Patch, Param,
  HttpCode, HttpStatus, UseGuards, UseInterceptors, ParseIntPipe,
  CacheTTL
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { AtGuard } from 'src/common/guards';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { Public } from 'src/common/decorators';
import { CacheInterceptor } from '@nestjs/cache-manager';

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
  @Get('/list/:productId')
  @UseInterceptors(new SuccessInterceptor()
    , CacheInterceptor
  )
  @CacheTTL(6000)
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

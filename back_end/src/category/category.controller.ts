import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseInterceptors, HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Public } from 'src/common/decorators';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('api/v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }
}

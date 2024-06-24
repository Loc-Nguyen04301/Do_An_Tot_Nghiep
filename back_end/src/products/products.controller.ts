import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  Inject,
  CacheTTL,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor("Get Successfully")
    , CacheInterceptor
  )
  @CacheTTL(300000)
  findAll() {
    return this.productsService.findAll();
  }

  @Public()
  @Get('/category/:category')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor()
    , CacheInterceptor
  )
  @CacheTTL(300000)
  findByCategory(@Param('category') category: string) {
    return this.productsService.findByCategory(category)
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor()
    , CacheInterceptor
  )
  @CacheTTL(300000)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Public()
  @Get('/name/:name')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor()
    , CacheInterceptor
  )
  @CacheTTL(300000)
  findByName(@Param('name') name: string) {
    return this.productsService.findByName(name);
  }

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor('Create Product Successfully'))
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Public()
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor(`Update Product Successfully`))
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Public()
  @Delete(':id')
  @UseInterceptors(new SuccessInterceptor())
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}

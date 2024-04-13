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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { AtGuard } from 'src/common/guards';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productsService.create(createProductDto);
  // }

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  findAll() {
    return this.productsService.findAll();
  }

  @Public()
  @Get('/category/:category')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  findByCategory(@Param('category') category: string) {
    return this.productsService.findByCategory(category)
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Public()
  @Get('/name/:name')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  findByName(@Param('name') name: string) {
    return this.productsService.findByName(name);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}

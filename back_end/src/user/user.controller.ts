import { Controller, Get, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseInterceptors, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, Roles } from 'src/common/decorators';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { Role } from 'src/types';
import { AtGuard } from 'src/common/guards';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor('Update Profile Success'))
  @Patch(':id')
  updateProfile(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateProfile(id, updateUserDto);
  }

  @UseGuards(AtGuard)
  // @Roles(Role.ADMIN)
  @Roles()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  @Get()
  getUser() {
    return this.userService.getListUser();
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}

import { Controller, Get, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseInterceptors, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, Roles } from 'src/common/decorators';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { AtGuard } from 'src/common/guards';
import { Role } from 'src/types';

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
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor('Update Profile Success'))
  @Patch('active/:id')
  updateActiveCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.userService.updateActiveCustomer(id);
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
}

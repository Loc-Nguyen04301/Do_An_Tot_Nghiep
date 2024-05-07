import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { JwtPayload, JwtRefreshPayload } from './strategies';
import { AtGuard, RtGuard } from 'src/common/guards';
import { Public } from 'src/common/decorators';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor('Register Success'))
  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor('Login Success'))
  @Post('login')
  logIn(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.logIn(loginAuthDto);
  }

  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor('Logout Success'))
  @Post('logout')
  logOut(@Req() req: Request) {
    const user = req.user as JwtPayload;
    return this.authService.logOut(user.id);
  }

  @Public()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  @Post('refreshtoken')
  refreshToken(@Req() req: Request) {
    const user = req.user as JwtRefreshPayload;
    return this.authService.refreshToken(user.id);
  }

}

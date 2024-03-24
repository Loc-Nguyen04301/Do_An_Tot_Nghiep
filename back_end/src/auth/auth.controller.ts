import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Request } from 'express';
import { JwtPayload, JwtRefreshPayload } from './strategies';
import { AtGuard, RtGuard } from 'src/common/guards';
import { Public } from 'src/common/decorators';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor('Register Success'))
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor('Login Success'))
  logIn(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.logIn(loginAuthDto);
  }

  // put guard in front of route
  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor('Logout Success'))
  logOut(@Req() req: Request) {
    console.log(req);
    const user = req.user as JwtPayload;
    return this.authService.logOut(user.id);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refreshtoken')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  refreshToken(@Req() req: Request) {
    console.log(req);
    const user = req.user as JwtRefreshPayload;
    return this.authService.refreshToken(user.id, user.refresh_token);
  }
}

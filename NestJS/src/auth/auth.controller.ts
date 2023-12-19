import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Request } from 'express';
import { JwtPayload, JwtRefreshPayload } from './strategies';
import { AtGuard, RtGuard } from 'src/common/guards';
import { Public } from 'src/common/decorators';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  logIn(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.logIn(loginAuthDto);
  }

  // put guard in front of route
  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logOut(@Req() req: Request) {
    const user = req.user as JwtPayload;
    console.log(req);
    return this.authService.logOut(user.id);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refreshtoken')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() req: Request) {
    const user = req.user as JwtRefreshPayload;
    console.log(req);
    return this.authService.refreshToken(user.id, user.refresh_token);
  }
}

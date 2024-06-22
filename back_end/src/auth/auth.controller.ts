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
import { Public, Roles } from 'src/common/decorators';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ChangePasswordDto } from 'src/auth/dto/change-password-auth.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  @Post('registerGoogle')
  registerGoogle(@Body() googleAuthPayload: {
    email: string
    name: string
    picture: string
    email_verified: boolean
  }) {
    return this.authService.registerGoogle(googleAuthPayload);
  }

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

  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  @Post('getMe')
  getMeProfile(@Req() req: Request) {
    const user = req.user as JwtPayload;
    return this.authService.getMeProfile(user.id);
  }

  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor("Update Password Success"))
  @Post('changePassword')
  changePassword(
    @Req() req: Request, @Body() changePasswordDto: ChangePasswordDto
  ) {
    const user = req.user as JwtPayload;
    return this.authService.changePassword(user.id, changePasswordDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new SuccessInterceptor())
  @Post('forgotPassword')
  forgotPassword(@Body() { email }: { email: string }) {
    return this.authService.forgotPassword(email);
  }
}

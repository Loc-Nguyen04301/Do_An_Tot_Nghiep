import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ChangePasswordDto } from 'src/auth/dto/change-password-auth.dto';
import { MailService } from 'src/mail/mail.service';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService, private mailService: MailService) { }

  hashData(data: string) {
    return bcrypt.hash(data, saltOrRounds);
  }

  async generateToken(id: number, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { id: id, role: role },
        { secret: process.env.SECRET_AT, expiresIn: process.env.AT_EXPIRES },
      ),
      this.jwtService.signAsync(
        { id: id, role: role },
        { secret: process.env.SECRET_RT, expiresIn: process.env.RT_EXPIRES },
      ),
    ]);

    return { refreshToken, accessToken };
  }

  async updateRefreshTokenHash(id: number, refreshToken: string) {
    const refreshTokenHash = await this.hashData(refreshToken);

    await this.prisma.user.update({
      where: { id },
      data: { refresh_token: refreshTokenHash },
    });
  }

  async registerGoogle(googleAuthPayload: {
    email: string
    name: string
    picture: string
    email_verified: boolean
  }) {
    const { email, email_verified, name, picture } = googleAuthPayload
    // Check if user exists
    if (!email_verified) throw new UnauthorizedException('Gmail chưa được xác thực. Vui lòng thử lại')
    const password = email
    const hashPassword = await this.hashData(password);
    const existUser = await this.prisma.user.findUnique({
      where: { email: email }
    })
    if (existUser) {
      const data = await this.logIn({ email: email, password: password })
      return data
    }
    else {
      await this.prisma.user.create({
        data: {
          username: name,
          email: email,
          password: hashPassword,
          avatar: picture,
          active: true,
          is_social_login: true
        },
      });
      const data = await this.logIn({ email: email, password: password })
      return data
    }
  }

  async register(createAuthDto: CreateAuthDto) {
    // Check if user exists
    const existUser = await this.prisma.user.findUnique({
      where: { email: createAuthDto.email },
    });
    if (existUser) throw new BadRequestException('Email đã tồn tại. Vui lòng thử lại');
    // Create new user
    const hashPassword = await this.hashData(createAuthDto.password);

    const newUser = await this.prisma.user.create({
      data: {
        username: createAuthDto.username,
        email: createAuthDto.email,
        password: hashPassword,
        active: true
      },
    });
    if (newUser) return;
  }

  async logIn(loginAuthDto: LoginAuthDto) {
    // Check if user exists
    const matchingUser = await this.prisma.user.findUnique({
      where: { email: loginAuthDto.email },
    });
    if (!matchingUser)
      throw new ForbiddenException('Email không tồn tại. Vui lòng thử lại.',);

    // Check if password matching
    const isMatchingPassword = bcrypt.compareSync(
      loginAuthDto.password,
      matchingUser.password,
    );
    if (!isMatchingPassword)
      throw new ForbiddenException('Mật khẩu không đúng. Vui lòng thử lại.');

    // Check if account is active
    if (!matchingUser.active) {
      throw new ForbiddenException('Tài khoản chưa được kích hoạt. Vui lòng liên lạc với nhà quản trị để được hỗ trợ.');
    }

    //Create access token and refresh token
    const { accessToken, refreshToken } = await this.generateToken(
      matchingUser.id,
      matchingUser.role
    );
    // create hashed refresh token saved in DB
    await this.updateRefreshTokenHash(matchingUser.id, refreshToken);

    return {
      user: {
        id: matchingUser.id,
        username: matchingUser.username,
        email: matchingUser.email,
        avatar: matchingUser.avatar,
        address: matchingUser.address,
        phone_number: matchingUser.phone_number,
        role: matchingUser.role,
        is_social_login: matchingUser.is_social_login
      },
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }

  async logOut(id: number) {
    // delete refresh token in DB
    await this.prisma.user.update({
      where: { id: id, refresh_token: { not: null } },
      data: { refresh_token: null },
    });
    return;
  }

  async refreshToken(id: number) {
    // Check if user exists
    const matchingUser = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!matchingUser.refresh_token)
      throw new UnauthorizedException(
        'Logged in!, Refresh Token is null',
      );

    //create new access token and refresh token
    const { accessToken, refreshToken } = await this.generateToken(
      matchingUser.id,
      matchingUser.role
    );

    // create hashed refresh token saved in DB
    await this.updateRefreshTokenHash(matchingUser.id, refreshToken);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }

  async getMeProfile(id: number) {
    // delete refresh token in DB
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        address: user.address,
        phone_number: user.phone_number,
        role: user.role,
        is_social_login: user.is_social_login
      },
    }
  }

  async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    // delete refresh token in DB
    const matchingUser = await this.prisma.user.findUnique({
      where: { id: id },
    });
    console.log(changePasswordDto.password, matchingUser.password)
    const isMatchingPassword = bcrypt.compareSync(
      changePasswordDto.password,
      matchingUser.password,
    );
    if (!isMatchingPassword) throw new ForbiddenException('Mật khẩu không đúng. Vui lòng thử lại.');

    const hashPassword = await this.hashData(changePasswordDto.new_password);
    const updateUser = await this.prisma.user.update({
      where: { id: id },
      data: {
        password: hashPassword
      }
    })

    if (!updateUser) throw new ForbiddenException('Đổi mật khẩu không thành công. Vui lòng thử lại !');
    return
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    })
    if (!user) throw new ForbiddenException('Email không tồn tại. Vui lòng thử lại.',)

    const randomPassword = process.env.RANDOM_PASSWORD
    const hashPassword = await this.hashData(randomPassword)
    await this.prisma.$transaction(async (tr) => {
      await tr.user.update({
        where: {
          email: email
        },
        data: {
          password: hashPassword
        }
      })
      await this.mailService.sendNewPassword({
        to: email,
        subject: `Xác nhận cấp mật khẩu mới từ THOL`,
        new_password: randomPassword
      })
    })
  }
}

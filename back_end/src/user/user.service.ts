import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async updateProfile(id: number, updateUserDto: UpdateUserDto) {
    if (id) {
      const updateProfile = await this.prisma.user.update({ where: { id }, data: updateUserDto })
      return updateProfile
    }
  }

  async getListUser() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        role: true,
        active: true,
        phone_number: true,
        address: true,
        created_at: true,
        update_at: true
      },
      orderBy: {
        role: "desc"
      }
    })

    return users
  }
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}

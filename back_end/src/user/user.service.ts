import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async updateProfile(id: number, updateUserDto: UpdateUserDto) {
    if (id) {
      const updateProfile = await this.prisma.user.update({ where: { id }, data: updateUserDto })
      return updateProfile
    }
  }

  async updateActiveCustomer(id: number) {
    const customerById = await this.prisma.user.findFirst({ where: { id } })

    let currentStateActiveCustomer = customerById.active
    const customer = await this.prisma.user.update({
      where: { id }, data: {
        active: currentStateActiveCustomer ? false : true
      }
    })
    return customer
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
}

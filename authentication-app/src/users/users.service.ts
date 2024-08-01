import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersServices {
  constructor (private prismaService: PrismaService) {}

  async createUser(user: CreateUserDto, photo: string): Promise<User> {
    return this.prismaService.user.create({
      data: {
        ...user,
        photo: photo
      }
    });
  }

  async findOneUser(id: number): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id }
    });
  }

  async findOneUserByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { email }
    });
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<string> {
    if (user.password) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
    }

    try {
      await this.prismaService.user.update({
        where: { id },
        data: user
      });
      return JSON.stringify('User updated');
    } catch (error) {
      throw new BadRequestException('User not updated');
    }
  }
  
}

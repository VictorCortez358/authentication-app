import { Injectable } from '@nestjs/common';
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
    
    const emailExist = await this.prismaService.user.findUnique({
      where: { email: user.email }
    });

    if (emailExist) {
      return JSON.stringify('Email already exists');
    }

    if (user.password) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
    }

    try {
      await this.prismaService.user.update({
        where: { id },
        data: user
      });
      return JSON.stringify('User updated successfully');
    } catch (error) {
      if (error.code === 'P2025') {
        return JSON.stringify('User not found');
      }
      return JSON.stringify('An error occurred during the update');
    }
  }
  
}

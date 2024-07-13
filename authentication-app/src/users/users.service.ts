import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersServices {
  constructor (private prismaService: PrismaService) {}

  async createUser(user: CreateUserDto): Promise<string>{
    const newUser = this.prismaService.user.create({
      data: user
    });

    if (!newUser) {
      return Promise.reject('User not created');
    }

    return Promise.resolve('User created');
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
    const foundUser = this.prismaService.user.update({
      where: { id },
      data: user
    });
  
    if (!foundUser) {
      return Promise.reject('User not found');
    }
  
    return Promise.resolve('User updated');
  }
}

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
export declare class UsersServices {
    private prismaService;
    constructor(prismaService: PrismaService);
    createUser(user: CreateUserDto, photo: string): Promise<User>;
    findOneUser(id: number): Promise<User>;
    findOneUserByEmail(email: string): Promise<User>;
    updateUser(id: number, user: UpdateUserDto): Promise<string>;
}

import { UsersServices } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersServices);
    findOne(id: string): Promise<{
        id: number;
        name: string;
        bio: string | null;
        phone: string;
        email: string;
        password: string;
        photo: string;
    }>;
    findbyEmail(email: string): Promise<{
        id: number;
        name: string;
        bio: string | null;
        phone: string;
        email: string;
        password: string;
        photo: string;
    }>;
    update(id: string, updateUserDto: UpdateUserDto, image: Express.Multer.File, res: Response): void;
}

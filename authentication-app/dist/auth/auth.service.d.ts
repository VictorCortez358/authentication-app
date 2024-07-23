import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersServices } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userServices;
    private jwtService;
    constructor(userServices: UsersServices, jwtService: JwtService);
    signUp(user: CreateUserDto, photo: string): Promise<string>;
    signIn(email: string, pass: string): Promise<{
        access_token: string;
        message: string;
    }>;
    googleLogin(user: any): Promise<string>;
}

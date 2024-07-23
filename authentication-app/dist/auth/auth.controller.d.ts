import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { signInDto } from './dto/sign-in.dto';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(user: CreateUserDto, image: Express.Multer.File): Promise<string>;
    signIn(auth: signInDto): Promise<{
        access_token: string;
        message: string;
    }>;
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any, res: Response): Promise<void>;
}

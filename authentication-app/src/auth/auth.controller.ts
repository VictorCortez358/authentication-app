import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { signInDto } from './dto/sign-in.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './utils/multer.config';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(FileInterceptor('photo', { storage }))
  signUp(@Body() user: CreateUserDto, @UploadedFile() image: Express.Multer.File) {
    const imagePath = image.path;

    return this.authService.signUp(user, imagePath);
  }

  @Post('signin')
  signIn(@Body() auth: signInDto) {
    return this.authService.signIn(auth.email, auth.password);
  }

}

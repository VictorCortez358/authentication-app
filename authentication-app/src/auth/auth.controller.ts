import { Controller, Post, Body, UseInterceptors, UploadedFile, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { signInDto } from './dto/sign-in.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './utils/multer.config';
import { GoogleOAuthGuard } from './google-oauth.guard';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

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

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req) { }

  @Get('callback/google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    try {
      const user = req.user;
      const token = await this.authService.googleLogin(user);
      res.cookie('authToken', token);
      res.redirect(`http://localhost:3001/profile`);
    } catch (error) {
      res.redirect('http://localhost:3001/');
    }
  }
}

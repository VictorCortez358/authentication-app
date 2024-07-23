import { Controller, Get, Body, Patch, Param, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersServices } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/auth/utils/multer.config';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersServices) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneUser(+id);
  }

  @UseGuards(AuthGuard)
  @Get()
  findbyEmail(@Body() email: string) {
    return this.usersService.findOneUserByEmail(email);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo', { storage }))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @UploadedFile() image: Express.Multer.File) {
    if (image) {
      updateUserDto.photo = image.path;
    }
    return this.usersService.updateUser(+id, updateUserDto);
  }
}

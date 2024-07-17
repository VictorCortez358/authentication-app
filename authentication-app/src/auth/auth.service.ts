import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersServices } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private userServices: UsersServices,
    private jwtService: JwtService
  ) {}
  
  async signUp(user: CreateUserDto, photo: { filename: any; }): Promise<string> {

    const userExist = await this.userServices.findOneUserByEmail(user.email);
    if (userExist) {
      return JSON.stringify('User already exist');
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    const newUser = this.userServices.createUser(user, photo);

    if (!newUser) {
      return JSON.stringify('User not created');
    }else{
      return JSON.stringify(newUser);
    
    }
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string, message: string }> {
    const user = await this.userServices.findOneUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    

    if (user?.password && !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }
    
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    return {
      message: 'User logged in',
      access_token: token
    };
  }

  async signOut() {
    return 'This action adds a new auth';
  }

}

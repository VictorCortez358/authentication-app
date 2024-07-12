import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersServices } from 'src/users/users.service';


@Injectable()
export class AuthService {
  constructor(private userServices: UsersServices) {}
  
  async signUp(user: CreateUserDto): Promise<string> {
    const userExist = this.userServices.findOneUserByEmail(user.email);

    if (userExist) {
      return Promise.reject('User already exists');
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    const newUser = this.userServices.create(user);

    if (!newUser) {
      return Promise.reject('User not created');
    }else{
      return Promise.resolve('User created');
    
    }
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userServices.findOneUserByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    return result;
  }

  async signOut() {
    return 'This action adds a new auth';
  }

}

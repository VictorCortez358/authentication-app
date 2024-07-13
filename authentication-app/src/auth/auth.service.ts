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
  
  async signUp(user: CreateUserDto): Promise<string> {
    const userExist = this.userServices.findOneUserByEmail(user.email);

    if (userExist) {
      return Promise.reject('User already exists');
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    const newUser = this.userServices.createUser(user);

    if (!newUser) {
      return Promise.reject('User not created');
    }else{
      return Promise.resolve('User created');
    
    }
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userServices.findOneUserByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async signOut() {
    return 'This action adds a new auth';
  }

}

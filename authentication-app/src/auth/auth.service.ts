import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  
  async signUp(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async signIn(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async signOut() {
    return 'This action adds a new auth';
  }

}

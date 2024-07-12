import { Module } from '@nestjs/common';
import { UsersServices } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersServices],
  exports: [UsersServices]
})
export class UsersModule {}

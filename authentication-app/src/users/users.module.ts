import { Module } from '@nestjs/common';
import { UsersServices } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersServices],
  exports: [UsersServices]
})
export class UsersModule {}

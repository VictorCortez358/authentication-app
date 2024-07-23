import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GoogleStrategy } from './auth/utils/google.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UsersModule, ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        extensions: ['jpg'],
      },
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [GoogleStrategy],
})
export class AppModule { }

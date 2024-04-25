import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Global()
@Module({
  imports:[
    TypeOrmModule.forFeature([User]),UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

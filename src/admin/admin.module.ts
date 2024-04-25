import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entities/admin.entity';
import { User } from '../user/entities/user.entity';
import { UserAdmin } from './entities/userAdmin.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, User, UserAdmin]), UserModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}

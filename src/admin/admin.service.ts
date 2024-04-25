import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { IAdmin } from 'src/common/interfaces/admin.interface';
import { User } from 'src/user/entities/user.entity';
import { IUser } from 'src/common/interfaces/user.interface';
import { CreateUserAdminDto } from './dto/create-userAdmin.dto';
import { UserAdmin } from './entities/userAdmin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserAdmin)
    private readonly userAdminRepository: Repository<UserAdmin>
  ){}
  async create(createAdminDto: CreateAdminDto): Promise<IAdmin> {
    // const userFound = await this.userRepository.findOne({
    //   where:{
    //     id:createAdminDto.userId
    //   }
    // })
    return await this.adminRepository.save(createAdminDto)
  }

  async createUserAdmin(CreateUserAdminDto:CreateUserAdminDto) {
    return await this.userAdminRepository.save(CreateUserAdminDto)
  }
  async findAll() {
    return await this.adminRepository.find();
  }

  async findOne(id: string) {
    try {
      const admin = await this.adminRepository
      .createQueryBuilder('admin')
      .where({ id })
      .leftJoinAndSelect('admin.usersIncludes','usersIncludes')
      .leftJoinAndSelect('usersIncludes.user','user')
      .getOne();
      return admin
    } catch (error) {
      console.log(error);
      
      throw error
    }
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUser } from 'src/common/interfaces/user.interface';
import { createCustomException } from 'src/utils/exceptionsGenerator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    try {

      const numberIdFound = await this.userRepository.findOne({
        where: {
          numberId: createUserDto.numberId,
        },
      });
      
      if (numberIdFound) {
        const CustomException = createCustomException(
          'La Cedula ya esta registrada',
          409,
          'User',
        );
        throw new CustomException();
      }
      const emailFound = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
      if (emailFound) {
        const CustomException = createCustomException(
          'El email ya esta registrado',
          409,
          'User',
        );
        throw new CustomException();
      }
      createUserDto.password = await this.hashPassword(createUserDto.password)
      return await this.userRepository.save(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.userRepository.find({
      // relations:['admin']
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where({ id })
      .leftJoinAndSelect('user.adminsIncludes', 'adminsIncludes')
      .leftJoinAndSelect('adminsIncludes.admin', 'admin')
      .getOne();
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async hashPassword(password: string): Promise<string> {
    try {
      const saltRounds = parseInt(process.env.HASH_SALT as string);
      const salt = await bcrypt.genSalt(saltRounds);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw error;
    }
  }
  
}

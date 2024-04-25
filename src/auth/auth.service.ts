import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { CreateAuthDto } from './dto/create-auth.dto';
import { IPayloadToken } from '../common/interfaces/auth.interface';
import { User } from '../user/entities/user.entity';
import { createCustomException } from 'src/utils/exceptionsGenerator';
import { UserService } from 'src/user/user.service';
import { IUser } from 'src/common/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  async validateUser(createAuthDto: CreateAuthDto): Promise<User | null> {
    try {
      // const userFound = await this.userService.findOne(createAuthDto.email);

      const userFound = await this.userRepository.findOne({
        where: {
          email: createAuthDto.email,
        },
      });

      if (userFound) {
        const match = await compare(createAuthDto.password, userFound.password);
        if (match) {
          const jwt = await this.generateJWT(userFound);
          return jwt;
        }
      }
      throw createCustomException('Credenciales Invalidas', 401, 'Auth');
    } catch (error) {
      throw error;
    }
  }

  signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: string;
  }) {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  async generateJWT(user: User): Promise<any> {
    // const getUser = await this.userService.findOne(user.id);
    const getUser = await this.userRepository.findOne({
      where: { id: user.id },
    });
    const payload: IPayloadToken | IUser= {
      role: getUser.role,
      sub: getUser.id
    };
    return {
      accessToken: this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRE,
      }),
      user
    };
  }
}

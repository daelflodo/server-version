import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { createCustomException } from 'src/utils/exceptionsGenerator';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags('Auth')
@Controller('auth')
export class AuthController { 
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() createAuthDto: CreateAuthDto) { 
    return this.authService.validateUser(createAuthDto);
  }
}

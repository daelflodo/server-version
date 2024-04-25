import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';
import { ROLES } from '../../common/constants/roles';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly fullName: string;

  @IsNotEmpty()
  @IsString()
  readonly numberId: string;

  @IsNotEmpty()
  @IsNotEmpty()
  readonly numberPhone: number;

  @IsString()

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsEnum(ROLES)
  readonly role: ROLES;
}

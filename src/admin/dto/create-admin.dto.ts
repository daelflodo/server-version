import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateAdminDto {
   
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsOptional()
  servicesId: string;
}

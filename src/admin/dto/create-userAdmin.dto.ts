import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { User } from "../../user/entities/user.entity";
import { Admin } from "../entities/admin.entity";
import { ACCESS_LEVEL } from "src/common/constants/roles";

export class CreateUserAdminDto {
   
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    user: User;
    
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    admin: Admin;
    
    @IsNotEmpty()
    @IsEnum(ACCESS_LEVEL)
    accessLevel: ACCESS_LEVEL

}

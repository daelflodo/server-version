import { Admin } from "src/admin/entities/admin.entity";
import { ACCESS_LEVEL } from "../constants/roles";
import { User } from "src/user/entities/user.entity";

export interface IUserAdmin {
  user: User;
  admin: Admin;
  accessLevel: ACCESS_LEVEL;
}

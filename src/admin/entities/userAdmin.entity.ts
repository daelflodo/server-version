import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../config/base.entity';
import { ACCESS_LEVEL } from '../../common/constants/roles';
import { User } from '../../user/entities/user.entity';
import { Admin } from './admin.entity';

@Entity({ name: 'user_admin' })
export class UserAdmin extends BaseEntity {
  @Column({ type: 'enum', enum: ACCESS_LEVEL })
  accessLevel: ACCESS_LEVEL;

  @ManyToOne(() => User, (user) => user.adminsIncludes)
  user: User;

  @ManyToOne(() => Admin, (admin) => admin.usersIncludes)
  admin: Admin;
}

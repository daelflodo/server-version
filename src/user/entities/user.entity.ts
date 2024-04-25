import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

import { UserAdmin } from '../../admin/entities/userAdmin.entity';
import { BaseEntity } from '../../config/base.entity';
import { ROLES } from '../../common/constants/roles';
import { IUser } from '../../common/interfaces/user.interface';

@Entity({ name: 'user' })
export class User extends BaseEntity implements IUser {
  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false, unique: true })
  numberId: string;

  @Column({ nullable: false })
  numberPhone: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, type: 'enum', enum: ROLES })
  role: ROLES;

  @OneToMany(()=> UserAdmin, (usersAdmin)=> usersAdmin.user)
  adminsIncludes: UserAdmin[];
}

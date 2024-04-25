import { Column, Entity, OneToMany } from 'typeorm';

import { IAdmin } from '../../common/interfaces/admin.interface';
import { BaseEntity } from '../../config/base.entity';
import { UserAdmin } from './userAdmin.entity';

@Entity({ name: 'admin' })
export class Admin extends BaseEntity implements IAdmin {
  @Column({
    nullable: false,
  })
  userId: string;

  @Column({
    nullable: true,
  })
  servicesId: string;

  @OneToMany(()=> UserAdmin, (usersAdmin)=> usersAdmin.admin)
  usersIncludes: UserAdmin[];
}

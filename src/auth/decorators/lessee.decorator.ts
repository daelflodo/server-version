import { SetMetadata } from '@nestjs/common';
import { LESSEE_KEY } from 'src/common/constants/key-decorators';
import { ROLES } from 'src/common/constants/roles';


export const LesseeAccess = () => SetMetadata(LESSEE_KEY, ROLES.LESSEE);
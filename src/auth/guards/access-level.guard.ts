import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ACCESS_LEVEL_KEY, ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/common/constants/key-decorators';
import { ACCESS_LEVEL, ROLES } from 'src/common/constants/roles';
import { UserService } from 'src/user/user.service';
import { createCustomException } from 'src/utils/exceptionsGenerator';


@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );

    const accessLevel = this.reflector.get<keyof typeof ACCESS_LEVEL>(
      ACCESS_LEVEL_KEY,
      context.getHandler(),
    );

    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    const req = context.switchToHttp().getRequest<Request>();

    const { roleUser, idUser } = req;

    if (accessLevel === undefined) {
      if (roles === undefined) {
        if (!admin) {
          return true;
        } else if (admin && roleUser === admin) {
          return true;
        } else {
          throw new UnauthorizedException(
            'No tienes permisos para esta operacion',
          );
        }
      }
    }

    if (roleUser === ROLES.ADMIN /*|| roleUser === ROLES.LESSEE*/) {
      return true;
    }

    const user = await this.userService.findOne(idUser);

    const userExistInAdmin = user.adminsIncludes.find(
      (admin) => admin.admin.id === req.params.adminId,
    );
console.log("USEREXIS:", userExistInAdmin);

    if (userExistInAdmin === undefined) {
      throw createCustomException('No Perteneces a la junta directiva', 403, 'Auth');
    }

    if (ACCESS_LEVEL[accessLevel] !== userExistInAdmin.accessLevel) {
      throw createCustomException('No tienes el nivel de acceso necesario', 403, 'Auth');
    }

    return true;
  }
}
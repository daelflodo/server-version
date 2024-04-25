import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PUBLIC_KEY } from 'src/common/constants/key-decorators';
import { IUseToken } from 'src/common/interfaces/auth.interface';
import { UserService } from 'src/user/user.service';
import { createCustomException } from 'src/utils/exceptionsGenerator';
import { useToken } from 'src/utils/use.token';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    // fijamos si la ruta esta decorada como publica
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    // seteamos las funcionalidades http
    const req = context.switchToHttp().getRequest<Request>();
    // const token = req.headers['task_token'];
    const token = req.headers.authorization?.split(' ')[1];
    console.log('1::', token);

    if (!token || Array.isArray(token))
      // throw new UnauthorizedException('Invalid token');
      throw createCustomException('Invalid token', 401, 'Auth');

    const manageToken: IUseToken | string = useToken(token);
    
    if (typeof manageToken === 'string')
      throw createCustomException(manageToken, 401, 'Auth');

    if (manageToken.isExpired)
      throw createCustomException('Token expired', 401, 'Auth');

    const { sub } = manageToken;
    console.log("SUB:", sub );

    const user = await this.userService.findOne(sub);
    if (!user) {
      throw createCustomException('Invalid user', 401, 'Auth');
    }

    req.idUser = user.id;
    req.roleUser = user.role;
    return true;
  }
}

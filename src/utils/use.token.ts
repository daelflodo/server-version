import * as jwt from 'jsonwebtoken';
import { IAuthTokenResult, IUseToken } from 'src/common/interfaces/auth.interface';

export const useToken = (token: string): IUseToken | string => {
    try {
      const decode = jwt.decode(token) as IAuthTokenResult;
  
      const currentDate = new Date();
      console.log('currentDate de useToken',currentDate);
      
      const expiresDate = new Date(decode.exp);
      console.log('expiresDate de useToken',expiresDate);
  
      return {
        sub: decode.sub,
        role: decode.role,
        isExpired: +expiresDate <= +currentDate / 1000,
      };
    } catch (error) {
      return 'Token is invalid';
    }
}
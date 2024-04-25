import { HttpException } from '@nestjs/common';

import { statusCodes } from 'src/utils/statusCodesLibreary';

export function createCustomException(
  message: string,
  statusCode: number,
  path: string,
): any {
  class CustomException extends HttpException {
    constructor() {
      super(
        {
          message,
          error: `ERROR_${path.toUpperCase()}_${statusCodes[statusCode]}`,
          statusCode,
        },
        statusCode = 409,
      );
    }
  }
  throw new CustomException;
}

import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import confiq from '../../confiq';
import { Secret } from 'jsonwebtoken';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Not authorized');
      }

      // verify token

      const verifiedUserToken = jwtHelpers.verifyToken(
        token,
        confiq.jwt.secret as Secret,
      );
      console.log(verifiedUserToken);
      //if token got verfied
      req.user = verifiedUserToken; //  role, userId

      // role based guard
      if (
        requiredRoles.length &&
        !requiredRoles.includes(verifiedUserToken.role)
      ) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;

import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (payload: object, secret: Secret, expiresTime: string) => {
  return jwt.sign(payload, secret, {
    expiresIn: expiresTime,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import { Secret } from 'jsonwebtoken';
import confiq from '../../../confiq';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  //using static method
  const isUserExists = await User.isUserExist(id);

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExists.password &&
    !(await User.isPasswordMatched(password, isUserExists?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Password');
  }

  // create access token
  const { id: userId, role, needsPasswordChange } = isUserExists;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    confiq.jwt.secret as Secret,
    confiq.jwt.expires_in as string,
  );
  //* create refresh token
  // const refreshToken = jwt.sign({
  //   id: isUserExists?.id,
  //   role: isUserExists.role
  // }, confiq.jwt.refresh_secret as Secret, {
  //  expiresIn: confiq.jwt.refresh_expires_in
  // });
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    confiq.jwt.refresh_secret as Secret,
    confiq.jwt.refresh_expires_in as string,
  );
  console.log(accessToken, refreshToken, needsPasswordChange);
  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

export const AuthService = {
  loginUser,
};

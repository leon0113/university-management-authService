import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { JwtPayload, Secret } from 'jsonwebtoken';
import confiq from '../../../confiq';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import bcrypt from 'bcrypt';

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

  //TODO--------- Json Web Token
  const { id: userId, role, needsPasswordChange } = isUserExists;
  //* create access token
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    confiq.jwt.secret as Secret,
    confiq.jwt.expires_in as string,
  );

  //* create refresh token
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    confiq.jwt.refresh_secret as Secret,
    confiq.jwt.refresh_expires_in as string,
  );
  // console.log(accessToken, refreshToken, needsPasswordChange);
  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      confiq.jwt.refresh_secret as Secret,
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  // check if the user exists
  const isUserExist = await User.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    confiq.jwt.secret as Secret,
    confiq.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword,
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  //checking if user exists or not
  const isUserExists = await User.isUserExist(user?.userId);

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExists.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExists.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
  }

  //hash password before saving
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(confiq.bcrypt_salt_rounds),
  );

  //update the user password
  const query = { id: user?.userId };

  const updatedData = {
    password: newHashedPassword,
    needsPasswordChange: false,
    passwordChangeAt: new Date(),
  };

  // update the user password
  await User.findOneAndUpdate(query, updatedData);
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};

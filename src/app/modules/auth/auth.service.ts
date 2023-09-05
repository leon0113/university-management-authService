// import httpStatus from 'http-status';
// import ApiError from '../../../errors/ApiError';
// import { User } from '../users/user.model';
// import { ILoginUser } from './auth.interface';
// import jwt from 'jsonwebtoken';

// const loginUser = async (payload: ILoginUser) => {
//   // const { id, password } = payload;
//   //creating instance of user
//   const user = new User();
//   // access to our custom instance method
//   // const isUserExist = await user.isUserExist(id);
//   // if (!isUserExist) {
//   //   throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   // }

//   // if (
//   //   isUserExist.password &&
//   //   !user.isPasswordMatched(password, isUserExist?.password)
//   // ) {
//   //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Password');
//   // }

//   // // create access token & refresh token
//   // const accessToken = jwt.sign{
//   //   id: isUserExist?.id,
//   //   role: isUserExist?.role
//   // }

//   return {};
// };

// export const AuthService = {
//   loginUser,
// };

import { Request } from 'express';
import catchAsync from '../../../shared/catchAsync';

const loginUser = catchAsync(async (req: Request) => {
  console.log(req.body);
});

export const AuthController = {
  loginUser,
};

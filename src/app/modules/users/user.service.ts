import confiq from '../../../confiq';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utlis';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // AUTO generated incremental id

  const academicSemester = {
    code: '02',
    year: '2026',
  };
  const id = await generateStudentId(academicSemester);

  user.id = id;
  //default passsword
  if (!user.password) {
    user.password = confiq.default_user_password as string;
  }

  const createdUser = await User.create(user);

  if (!createUser) {
    throw new ApiError(400, 'Failed to create user!');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};

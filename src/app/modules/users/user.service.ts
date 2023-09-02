import mongoose from 'mongoose';
import confiq from '../../../confiq';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utlis';
import httpStatus from 'http-status';
import { Student } from '../student/student.model';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import bcrypt from 'bcrypt';

// TODO --------------CREATE STUDENT SERVICE----------------------
const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  //default passsword
  if (!user.password) {
    user.password = confiq.default_student_password as string;
  }
  //* password hashing with bcrypt
  user.password = await bcrypt.hash(
    user.password,
    Number(confiq.bcrypt_salt_rounds),
  );

  // set role
  user.role = 'student';
  // set id
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  );

  // generate student id

  let newUserAllData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    const newStudent = await Student.create([student], { session });

    if (!createStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    // set student_id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

// TODO --------------CREATE FACULTY SERVICE----------------------
const createFaculty = async (
  faculty: IFaculty,
  user: IUser,
): Promise<IUser | null> => {
  //default passsword
  if (!user.password) {
    user.password = confiq.default_faculty_password as string;
  }
  // set role
  user.role = 'faculty';

  // generate faculty id

  let newUserAllData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    const newFaculty = await Faculty.create([faculty], { session });

    if (!createFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Faculty');
    }

    // set student_id into user.student
    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

// TODO --------------CREATE ADMIN SERVICE---------------------
const createAdmin = async (
  admin: IAdmin,
  user: IUser,
): Promise<IUser | null> => {
  //default passsword
  if (!user.password) {
    user.password = confiq.default_admin_password as string;
  }
  // set role
  user.role = 'admin';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate admin id
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin ');
    }

    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};

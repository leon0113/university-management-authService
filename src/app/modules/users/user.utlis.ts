// import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudentId = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 },
  )
    .sort({
      createdAt: -1, // for organizing the createdAt field in decending order
    })
    .lean();

  return lastStudentId?.id ? lastStudentId.id.substring(4) : undefined;
};

export const generateStudentId = async (academicSemester: {
  code: string;
  year: string;
}): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');

  // increment id by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedId}`;
  // console.log(incrementedId);

  return incrementedId;
};

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementId = `F-${incrementId}`;

  return incrementId;
};

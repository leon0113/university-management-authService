// import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

//! TO GENERATE STUDENT ID
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

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null,
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');

  // increment id by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `${academicSemester?.year.substring(
    2,
  )}${academicSemester?.code}${incrementedId}`;
  // console.log(incrementedId);

  return incrementedId;
};

//! TO GENERATE FACULTY ID
// export const findLastFacultyId = async (): Promise<string | undefined> => {
//   const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
//     .sort({ createdAt: -1 })
//     .lean();
//   return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
// };

// export const generateFacultyId = async (): Promise<string> => {
//   const currentId =
//     (await findLastFacultyId()) || (0).toString().padStart(5, '0');
//   let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
//   incrementId = `F-${incrementId}`;

//   return incrementId;
// };

// Faculty ID
export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `F-${incrementedId}`;

  return incrementedId;
};

// addmin id
export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};

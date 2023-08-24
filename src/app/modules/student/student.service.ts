import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/paginationType';
import { IStudent, IStudentFilterOption } from './student.interface';
import { Student } from './student.model';
import { studentSearchableFields } from './student.constant';

//! pagination search and filltering
const getAllStudents = async (
  paginationOptions: IPaginationOptions,
  filters: IStudentFilterOption,
): Promise<IGenericPaginationResponse<IStudent[]>> => {
  // search
  const { searchTerm, ...filterData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  //! filtering
  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  //pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // query on model
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Student.find(whereCondition)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  // to count total documents
  const total = await Student.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get single semster
const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

// to update a semester
// const updateStudent = async (
//     id: string,
//     payload: Partial<IStudent>,
// ): Promise<IStudent | null> => {

//     const result = await Student.findOneAndUpdate({ _id: id }, payload, {
//         new: true,
//     });
//     return result;
// };

// delete semester
const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete({ _id: id })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

export const StudentService = {
  getAllStudents,
  getSingleStudent,
  // updateStudent,
  deleteStudent,
};

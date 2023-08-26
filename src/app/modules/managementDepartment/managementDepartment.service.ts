import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/paginationType';
import { managementDepartmentSearchableFields } from './managementDepartment.constant';
import {
  IManagementDepartment,
  IManagementDepartmentFilters,
} from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';

//* ------------------CREATE Management Department--------------------
const createManagementDepartment = async (
  payload: IManagementDepartment,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.create(payload);
  return result;
};

//* ------------------UPDATE Management Department--------------------
const updateManagementDepartment = async (
  id: string,
  updatedData: Partial<IManagementDepartment>,
) => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    updatedData,
    {
      new: true,
    },
  );
  return result;
};

//* ------------------GET SINGLE Management Department--------------------
const getSingleManagementDepartment = async (id: string) => {
  const result = await ManagementDepartment.findById(id);
  return result;
};

//* ------------------GET ALL Management Department--------------------
const getAllManagementDepartment = async (
  filters: IManagementDepartmentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericPaginationResponse<IManagementDepartment[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: managementDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await ManagementDepartment.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await ManagementDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

//* ------------------DELETE Management Department--------------------
const deleteManagementDepartment = async (
  id: string,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete({ _id: id });
  return result;
};

export const ManagementDepartmentService = {
  createManagementDepartment,
  updateManagementDepartment,
  getSingleManagementDepartment,
  getAllManagementDepartment,
  deleteManagementDepartment,
};

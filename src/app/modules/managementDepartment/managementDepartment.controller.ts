import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IManagementDepartment } from './managementDepartment.interface';
import httpStatus from 'http-status';
import { ManagementDepartmentService } from './managementDepartment.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/paginationConst';
import { managementDepartmentFilterableFields } from './managementDepartment.constant';

// TODO         ------------CREATE Management controller-------------------
const createManagementDepartmentToDb = catchAsync(
  async (req: Request, res: Response) => {
    const { ...managementDepartmentData } = req.body;
    const result = await ManagementDepartmentService.createManagementDepartment(
      managementDepartmentData,
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department Created successfully',
      data: result,
    });
  },
);

// TODO         ------------UPDATE Management controller-------------------
const updateManagementDepartmentToDb = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      updatedData,
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department Updated successfully',
      data: result,
    });
  },
);

// TODO         ------------GET SINGLE Management controller-------------------
const getSingleManagementDepartmentToDb = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id);
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Management Department Retrived successfully',
      data: result,
    });
  },
);

// TODO         ------------GET ALL Management controller-------------------
const getAllManagementDepartmentToDb = catchAsync(
  async (req: Request, res: Response) => {
    // searching & filtering
    const filters = pick(req.query, managementDepartmentFilterableFields);
    //paginationFields = ['page', 'limit', 'sortBy', 'sortOrder']
    const paginationOptions = pick(req.query, paginationFields);

    const result = await ManagementDepartmentService.getAllManagementDepartment(
      filters,
      paginationOptions,
    );

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Departments Retrived Successfully !',
      meta: result.meta,
      data: result.data,
    });
  },
);

// TODO         ------------DELETE Management controller-------------------
const deleteManagementDepartmentToDb = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await ManagementDepartmentService.deleteManagementDepartment(
      id,
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department Deleted Successfully !',
      data: result,
    });
  },
);

export const ManagementDepartmentController = {
  createManagementDepartmentToDb,
  updateManagementDepartmentToDb,
  getSingleManagementDepartmentToDb,
  getAllManagementDepartmentToDb,
  deleteManagementDepartmentToDb,
};

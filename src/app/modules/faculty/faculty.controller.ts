import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IFaculty } from './faculty.interface';
import httpStatus from 'http-status';
import { FacultyService } from './faculty.service';
import pick from '../../../shared/pick';
import { facultyFilterableFields } from './faculty.constant';
import { paginationFields } from '../../../constants/paginationConst';

const getSingleFacultyToDb = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.getSingleFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Faculty retrived Successfully !',
    data: result,
  });
});

//pagination
const getAllFacultiseToDb = catchAsync(async (req: Request, res: Response) => {
  // searching & filtering
  const filters = pick(req.query, facultyFilterableFields);
  //paginationFields = ['page', 'limit', 'sortBy', 'sortOrder']
  const paginationOptions = pick(req.query, paginationFields);

  const result = await FacultyService.getAllFacultise(
    paginationOptions,
    filters,
  );

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Students retrived Successfully !',
    meta: result.meta,
    data: result.data,
  });
});

// to update a semester
const updateFacultyToDb = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await FacultyService.updateFaculty(id, updatedData);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated Successfully !',
    data: result,
  });
});

const deleteFacultyToDb = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.deleteFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully !',
    data: result,
  });
});

export const FacultyController = {
  getSingleFacultyToDb,
  getAllFacultiseToDb,
  updateFacultyToDb,
  deleteFacultyToDb,
};

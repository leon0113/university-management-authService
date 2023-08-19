import status from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';
import { Request, Response } from 'express';
import { IAcademicSemester } from './academicSemester.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/paginationConst';

//create semester
const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body;
  const result = await AcademicSemesterService.createSemester(
    academicSemesterData,
  );
  sendResponse<IAcademicSemester>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Semester Created Successfully',
    data: result,
  });
});

//pagination
const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  // searching & filtering
  const filters = pick(req.query, ['searchTerm', 'title', 'code', 'year']);
  //paginationFields = ['page', 'limit', 'sortBy', 'sortOrder']
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemesterService.getAllSemester(
    paginationOptions,
    filters,
  );

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Semesters retrived Successfully !',
    meta: result.meta,
    data: result.data,
  });
});

// to get single semester
const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getSingleSemester(id);

  sendResponse<IAcademicSemester>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Semester retrived Successfully !',
    data: result,
  });
});

// to update a semester
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicSemesterService.updateSemester(id, updatedData);

  sendResponse<IAcademicSemester>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Semester updated Successfully !',
    data: result,
  });
});

// to delete a semester
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemesterService.deleteSemester(id);

  sendResponse<IAcademicSemester>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Semester deleted Successfully !',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};

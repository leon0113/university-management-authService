import status from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';
import { NextFunction, Request, Response } from 'express';
import { IAcademicSemester } from './academicSemester.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/paginationConst';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
    next();
  },
);

//pagination
const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
    next();
  },
);

const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await AcademicSemesterService.getSingleSemester(id);

    sendResponse<IAcademicSemester>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Academic Semester retrived Successfully !',
      data: result,
    });
    next();
  },
);

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
};

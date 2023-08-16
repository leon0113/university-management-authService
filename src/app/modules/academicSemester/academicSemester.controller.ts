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

    // res.status(200).json({
    //   success: true,
    //   message: 'Academic Semester created successfully',
    //   data: result,
    // });

    sendResponse<IAcademicSemester>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Academic Semester Created Successfully',
      meta: null,
      data: result,
    });
    next();
  },
);

//pagination
const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //paginationFields = ['page', 'limit', 'sortBy', 'sortOrder']
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicSemesterService.getAllSemester(
      paginationOptions,
    );

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Academic Semester retrived Successfully !',
      meta: result.meta,
      data: result.data,
    });
    next();
  },
);

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
};

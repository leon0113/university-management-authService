import status from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';
import { NextFunction, Request, Response } from 'express';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData,
    );
    next();

    // res.status(200).json({
    //   success: true,
    //   message: 'Academic Semester created successfully',
    //   data: result,
    // });

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'User Created successfully',
      data: result,
    });
  },
);

export const AcademicSemesterController = {
  createSemester,
};

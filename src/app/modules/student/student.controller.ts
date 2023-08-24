import status from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/paginationConst';
import { IStudent } from './student.interface';
import { studentFilterableFields } from './student.constant';
import { StudentService } from './student.service';

//pagination
const getAllStudentToDb = catchAsync(async (req: Request, res: Response) => {
  // searching & filtering
  const filters = pick(req.query, studentFilterableFields);
  //paginationFields = ['page', 'limit', 'sortBy', 'sortOrder']
  const paginationOptions = pick(req.query, paginationFields);

  const result = await StudentService.getAllStudents(
    paginationOptions,
    filters,
  );

  sendResponse<IStudent[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'All Students retrived Successfully !',
    meta: result.meta,
    data: result.data,
  });
});

// to get single semester
const getSingleStudentToDb = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.getSingleStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student retrived Successfully !',
    data: result,
  });
});

// to update a semester
const updateStudentToDb = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await StudentService.updateStudent(id, updatedData);

  sendResponse<IStudent>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student updated Successfully !',
    data: result,
  });
});

// to delete a semester
const deleteStudentToDb = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentService.deleteStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student deleted Successfully !',
    data: result,
  });
});

export const StudentController = {
  getAllStudentToDb,
  getSingleStudentToDb,
  updateStudentToDb,
  deleteStudentToDb,
};

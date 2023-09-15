import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicFaculty } from './academicFaculty.interface';
import httpStatus from 'http-status';
import { AcademicFacultyService } from './academicFaculty.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/paginationConst';

const createFacultyToDb = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.createFaculty(
    academicFacultyData,
  );

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  });
});

// to handle get single academic faculty req
const getSingleAcademicFacultyToDb = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicFacultyService.getSingleAcademicFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Academic Semester retrived Successfully !',
      data: result,
    });
  },
);

const deleteAcademicFacultyToDb = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicFacultyService.deleteAcademicFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester deleted Successfully !',
      data: result,
    });
  },
);

const updateAcademicFacultyToDb = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await AcademicFacultyService.updateAcademicFaculty(
      id,
      updatedData,
    );

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Updated Successfully !',
      data: result,
    });
  },
);

const getAllAcademicFacultyToDb = catchAsync(
  async (req: Request, res: Response) => {
    console.log(req.headers.authorization);
    console.log(req.user);
    // searching & filtering
    const filters = pick(req.query, ['searchTerm', 'title']);
    //paginationFields = ['page', 'limit', 'sortBy', 'sortOrder']
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicFacultyService.getAllAcademicFaculty(
      paginationOptions,
      filters,
    );

    sendResponse<IAcademicFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculties retrived Successfully !',
      meta: result.meta,
      data: result.data,
    });
  },
);

export const AcademicFacultyController = {
  createFacultyToDb,
  getSingleAcademicFacultyToDb,
  deleteAcademicFacultyToDb,
  updateAcademicFacultyToDb,
  getAllAcademicFacultyToDb,
};

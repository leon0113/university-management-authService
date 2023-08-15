// Request validation for academic semester
import { z } from 'zod';
import {
  AcademicSemesterCodes,
  AcademicSemesterMonths,
  AcademicSemesterTitles,
} from './academicSemester.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...AcademicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.number({
      required_error: 'Year is required',
    }),
    code: z.enum([...AcademicSemesterCodes] as [string, ...string[]], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start Month is required',
    }),
    endMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
      required_error: 'End Month is required',
    }),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema, // ZOD schema for user creation request
};

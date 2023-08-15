import express from 'express';
// import { UserController } from './user.controller';
import { AcademicSemesterValidation } from './acedemicSemester.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  //   UserController.createUser,
);

export const AcademicSemesterRoutes = router;

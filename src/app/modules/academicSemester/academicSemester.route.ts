import express from 'express';
import { AcademicSemesterValidation } from './acedemicSemester.validation';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester,
);

// to get a single doc
router.get('/:id', AcademicSemesterController.getSingleSemester);

// to get all docs and apply searching filtering
router.get('/', AcademicSemesterController.getAllSemester);

//to update a doc
// router.patch('/', AcademicSemesterController.updateSemester)

export const AcademicSemesterRoutes = router;

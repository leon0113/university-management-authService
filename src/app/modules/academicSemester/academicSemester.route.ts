import express from 'express';
import { AcademicSemesterValidation } from './acedemicSemester.validation';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();
// to create a semester
router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester,
);

// to get a single doc
router.get('/:id', AcademicSemesterController.getSingleSemester);

// to update a doc
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester,
);

// to delete a doc
router.delete('/:id', AcademicSemesterController.deleteSemester);

// to get all docs and apply searching filtering
router.get('/', AcademicSemesterController.getAllSemester);

export const AcademicSemesterRoutes = router;

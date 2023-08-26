import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/:id', FacultyController.getSingleFacultyToDb);

router.get('/', FacultyController.getAllFacultiseToDb);

router.delete('/:id', FacultyController.deleteFacultyToDb);

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFacultyToDb,
);

export const FacultyRoutes = router;

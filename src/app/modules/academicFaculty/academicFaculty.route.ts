import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

// create faculty
router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createFacultyToDb,
);

// get a single faculty
router.get('/:id', AcademicFacultyController.getSingleAcademicFacultyToDb);

router.patch('/:id', AcademicFacultyController.updateAcademicFacultyToDb);

router.delete('/:id', AcademicFacultyController.deleteAcademicFacultyToDb);

router.get('/', AcademicFacultyController.getAllAcademicFacultyToDb);

export const academicFacultyRoutes = router;

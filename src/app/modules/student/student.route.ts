import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidaion } from './student.validation';

const router = express.Router();

router.get('/:id', StudentController.getSingleStudentToDb);

router.get('/', StudentController.getAllStudentToDb);

router.delete('/:id', StudentController.deleteStudentToDb);

router.patch(
  '/:id',
  validateRequest(StudentValidaion.updateStudentZodSchema),
  StudentController.updateStudentToDb,
);

export const StudentRoutes = router;

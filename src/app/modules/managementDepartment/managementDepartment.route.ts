import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentValidation } from './managementDepartment.validation';
import { ManagementDepartmentController } from './managementDepartment.controller';

const router = express.Router();

// create Management Department
router.post(
  '/create-management-dept',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema,
  ),
  ManagementDepartmentController.createManagementDepartmentToDb,
);

// get a Management Department
router.get(
  '/:id',
  ManagementDepartmentController.getSingleManagementDepartmentToDb,
);

// update Management Department
router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema,
  ),
  ManagementDepartmentController.updateManagementDepartmentToDb,
);

router.delete(
  '/:id',
  ManagementDepartmentController.deleteManagementDepartmentToDb,
);

router.get('/', ManagementDepartmentController.getAllManagementDepartmentToDb);

export const ManagementDepartmentRoutes = router;

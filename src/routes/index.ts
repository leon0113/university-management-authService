import express from 'express';
import { AcademicSemesterRoutes } from '../app/modules/academicSemester/academicSemester.route';
import { UserRoutes } from '../app/modules/users/user.route';
import { AcademicFacultyRoutes } from '../app/modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../app/modules/academicDepartment/academicDepartment.routes';
import { StudentRoutes } from '../app/modules/student/student.route';
import { FacultyRoutes } from '../app/modules/faculty/faculty.route';
import { ManagementDepartmentRoutes } from '../app/modules/managementDepartment/managementDepartment.route';
import { AdminRoutes } from '../app/modules/admin/admin.route';
import { AuthRoutes } from '../app/modules/auth/auth.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/facultise',
    route: FacultyRoutes,
  },
  {
    path: '/management',
    route: ManagementDepartmentRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;

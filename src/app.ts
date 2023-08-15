import express, { Application } from 'express';
import cors from 'cors';
// import { UserRoutes } from './app/modules/users/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './routes';
// import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route';
// import ApiError from './errors/ApiError'

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Applications routes
// app.use('/api/v1/users/', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);
app.use('/api/v1/', routes);

// test
// app.get('/', async () => {
//   // Promise.reject(new Error('Unhandle Promise rejection'))
//   throw new Error('testing error logger')
// })

// global error handler
app.use(globalErrorHandler);

export default app;

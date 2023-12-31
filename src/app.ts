import status from 'http-status';
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Applications route
app.use('/api/v1/', routes);

// global error handler
app.use(globalErrorHandler);

//handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: 'Page not found',
    errorMessages: [
      {
        path: req.originalUrl, // to catch the wrong url
        message: 'Api not found',
      },
    ],
  });
  next();
});

export default app;

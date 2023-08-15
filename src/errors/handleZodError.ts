import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleZodHandler = (error: ZodError): IGenericErrorResponse => {
  // customized depending on Zod error structure showed -> 13-6 _> 9.5 min
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1], // path can't be a array as we fixed type in IGenericErrorMessage
      message: issue?.message,
    };
  });
  // console.log(errors);
  const statusCode = 400;
  return {
    statusCode,
    message: 'Zod validation error',
    errorMessages: errors,
  };
};

export default handleZodHandler;

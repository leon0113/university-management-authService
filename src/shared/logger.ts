import { createLogger, format, transports } from 'winston';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const mins = date.getMinutes();
  return `
    /////////////////////////////////////////////////////////////////////
    Date :${date.toDateString()},
    Hour: ${hour},
    Mintue: ${mins},
    Label: ${label},
    Level: ${level},
    Message: ${message}
    ---------------------------------------------------------------------`;
});

// for info logger

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'Info Level' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'log/winston/Successes/phu-%DATE%-success.log',
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

// for error logger

const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'Error Level!' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'log/winston/Errors/phu-%DATE%-error.log',
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export { logger, errorLogger };

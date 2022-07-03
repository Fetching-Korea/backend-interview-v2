import { LoggerService } from '@nestjs/common';
import { transports, createLogger, format } from 'winston';
import TransportStream = require('winston-transport');
import 'winston-daily-rotate-file';

import { SERVICE_NAME, LOG_LEVEL, LOG_PATH } from '../../environments';

const tps: TransportStream[] = [
  new transports.Console({
    level: LOG_LEVEL,
    format: format.combine(
      format.label({ label: `[${SERVICE_NAME}]` }),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.colorize(),
      format.printf(
        (info: TransformableInfo) =>
          `${info.timestamp} - ${info.level}: ${info.label} ${info.message}`,
      ),
    ),
  }),
];

if ('' != LOG_PATH && undefined != LOG_PATH) {
  tps.push(
    new transports.DailyRotateFile({
      filename: `${LOG_PATH}/${SERVICE_NAME}/error-%DATE%.log`,
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '32m',
      maxFiles: '31d',
    }),
  );
  tps.push(
    new transports.DailyRotateFile({
      filename: `${LOG_PATH}/${SERVICE_NAME}/info-%DATE%.log`,
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '32m',
      maxFiles: '31d',
    }),
  );
}

interface TransformableInfo {
  level: string;
  message: string;

  [key: string]: any;
}

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'HH:mm:ss',
    }),
    format.json(),
  ),
  transports: tps,
});

class NestCustomLogger implements LoggerService {
  log(message: string) {
    logger.info(message);
  }
  error(message: string, trace: string) {
    logger.error(message + '\n' + trace);
  }
  warn(message: string) {
    logger.warn(message);
  }
  debug(message: string) {
    logger.debug(message);
  }
  verbose(message: string) {
    logger.verbose(message);
  }
}

export { NestCustomLogger };

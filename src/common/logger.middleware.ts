import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP', { timestamp: true });

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl, body } = req;
    const userAgent = req.get('user-agent') || '';
    const token = req.get('Authorization')?.split(' ')[1] || '';
    const now = Date.now();

    res.on('finish', () => {
      const {
        statusCode,
        locals: { errorCode },
      } = res;

      let message = `${method} ${originalUrl} ${ip} ${userAgent} ${statusCode} ${
        Date.now() - now
      }ms`;
      message = message + ` ${JSON.stringify(body)}`;
      message = errorCode ? message + ` ${errorCode}` : message;
      message = token ? message + ` ${token}` : message;

      this.logger.log(message);
    });
    next();
  }
}

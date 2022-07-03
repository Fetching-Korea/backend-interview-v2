import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV, HTTP_DOMAIN, HTTP_PORT } from './environments';
import { NestCustomLogger } from './config';
import { Logger } from '@nestjs/common';
import { redisService, setupSwagger, typeormService } from './utils';

async function bootstrap(): Promise<any> {
  await typeormService.createTypeOrmOptions().then(() => {
    typeormService.source
      .initialize()
      .then(() => {
        Logger.log('Typeorm initialized');
      })
      .catch((err) => {
        Logger.error('Failed to initialize typeorm');
        Logger.error(`${err.message} - ${err.stack}`);
        process.exit(1);
      });
  });

  await redisService.createRedisOptions().then(() => {
    redisService.source
      .connect()
      .then(() => {
        Logger.log('Redis initialized');
      })
      .catch((err) => {
        Logger.error('Failed to initialize Redis');
        Logger.error(`${err.message} - ${err.stack}`);
        process.exit(1);
      });
  });

  const app = await NestFactory.create(AppModule, {
    logger: new NestCustomLogger(),
    cors: true,
  });

  if ('development' === ENV) setupSwagger(app);

  return app.listen(HTTP_PORT);
}
bootstrap().then(() => {
  Logger.log(`service started on ${HTTP_DOMAIN}:${HTTP_PORT}`);
});

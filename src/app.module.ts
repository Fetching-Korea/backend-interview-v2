import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './common/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

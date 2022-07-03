import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import AuthModule from './modules/auth';
import UserModule from './modules/user';
import ProductModule from './modules/product';
import ReviewModule from './modules/review';

@Module({
  imports: [AuthModule, UserModule, ProductModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

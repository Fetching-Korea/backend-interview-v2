import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import AuthModule from './modules/auth';
import UserModule from './modules/user';
import ProductModule from './modules/product';

@Module({
  imports: [AuthModule, UserModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';

@Module({
  imports: [ProductsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, 
	{
		provide: APP_GUARD,
		useClass: AtGuard,
  	},
  ],
})
export class AppModule {}

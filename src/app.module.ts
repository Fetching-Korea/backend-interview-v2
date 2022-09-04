import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { ItemsModule } from './api/items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전체적으로 사용하기 위해
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql', //Database 설정
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE_DEV,
      entities: ['dist/**/*.entity.{ts,js}', User], // Entity 연결
      synchronize: true, //true 값을 설정하면 어플리케이션을 다시 실행할 때 엔티티안에서 수정된 컬럼의 길이 타입 변경값등을 해당 테이블을 Drop한 후 다시 생성해준다.
    }),
    UsersModule,
    AuthModule,
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

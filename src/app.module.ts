import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

const envFilePath = `config/.env${
    process.env.stage && process.env.stage !== 'local' ? '' : `.local`
}`;

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: envFilePath,
            isGlobal: true,
        }),
        DatabaseModule,
    ],
})
export class AppModule {}

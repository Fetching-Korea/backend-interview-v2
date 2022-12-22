import { Global, Module } from '@nestjs/common';
import { databaseConnection } from './database.connection';

@Global()
@Module({
    providers: [...databaseConnection],
    exports: [...databaseConnection],
})
export class DatabaseModule {}

import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import dbinfo from './dbconfig.json';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: dbinfo.pw,
    database: 'items-app',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};

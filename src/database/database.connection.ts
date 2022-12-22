import { ConfigService } from '@nestjs/config';
import { entities } from '@src/database/entity';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

export const databaseConnection = [
    {
        provide: 'DB_CONNECTION',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const connection = new DataSource(getDatabaseOption(configService));
            try {
                return await connection.initialize();
            } catch (error) {
                return await connection.initialize();
            }
        },
    },
];

const getDatabaseOption = (configService: ConfigService): DataSourceOptions => {
    return {
        // multipleStatements: true,
        type: 'mysql',
        replication: {
            master: {
                host: configService.getOrThrow('MASTER_DB_HOST'),
                port: +configService.getOrThrow('MASTER_DB_PORT'),
                username: configService.getOrThrow('MASTER_DB_USER'),
                password: configService.getOrThrow('MASTER_DB_PASSWORD'),
                database: configService.getOrThrow('DB_NAME'),
            },
            slaves: [
                {
                    host: configService.getOrThrow('CHILD_DB_HOST'),
                    port: +configService.getOrThrow('CHILD_DB_PORT'),
                    username: configService.getOrThrow('CHILD_DB_USER'),
                    password: configService.getOrThrow('CHILD_DB_PASSWORD'),
                    database: configService.getOrThrow('DB_NAME'),
                },
            ],
        },
        entities: entities,
        extra: {
            connectionLimit: 10,
        },
        synchronize: false,
        logging: ['query', 'error'],
    };
};

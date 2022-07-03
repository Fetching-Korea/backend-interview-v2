import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions, DataSource } from 'typeorm';
import {
  MARIA_HOST,
  MARIA_PORT,
  MARIA_UN,
  MARIA_PW,
  MARIA_DB,
  ENV,
} from '../../environments';

@Injectable()
class TypeormService implements TypeOrmOptionsFactory {
  public source: DataSource;

  async createTypeOrmOptions(): Promise<DataSourceOptions> {
    const options: DataSourceOptions = {
      type: 'mariadb',
      host: MARIA_HOST,
      port: MARIA_PORT,
      username: MARIA_UN,
      password: MARIA_PW,
      database: MARIA_DB,
      // entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      entities: [`${__dirname}/../../**/*.entity.{ts,js}`],
      migrations: ['src/modules/*/migration'],
      subscribers: ['src/modules/*/subscriber'],
      synchronize: 'development' === ENV,
      logging: 'development' === ENV,
    };

    Logger.debug(options.entities);
    this.source = new DataSource(options);

    return options;
  }
}

const typeormService = new TypeormService();

export { typeormService };

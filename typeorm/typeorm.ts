import { DataSource } from 'typeorm';
import { CONFIG } from '../src/config/config';
import * as Models from './models';

export class TypeOrm {
  static dataSource = new DataSource({
    type: 'mariadb',
    host: CONFIG.DB.HOSTNAME,
    username: CONFIG.DB.USERNAME,
    password: CONFIG.DB.PASSWORD,
    port: CONFIG.DB.PORT,
    logging: false,
    database: CONFIG.DB.DATABASE,
    synchronize: true,
    dropSchema: false,
    charset: 'utf8mb4',
    entities: Models,
  });
}

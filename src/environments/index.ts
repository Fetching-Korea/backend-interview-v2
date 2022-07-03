import * as dotenv from 'dotenv';
dotenv.config();

const ENV: string = process.env.NODE_ENV || 'development';

const SERVICE_NAME: string =
  process.env.SERVICE_NAME || 'backend-interview-v2-nulLeeKH';

const LOG_LEVEL: string = process.env.LOG_LEVEL || 'silly';
const LOG_PATH: string = process.env.LOG_PATH || './log';

const HTTP_DOMAIN: string = process.env.DOMAIN || 'localhost';
const HTTP_PORT: number = +process.env.PORT || 3000;

const MARIA_HOST: string = process.env.MONGO_HOST || 'localhost';
const MARIA_PORT: number = +process.env.MONGO_PORT || 3306;
const MARIA_UN: string = process.env.MONGO_UN || 'root';
const MARIA_PW: string = process.env.MONGO_PW || 'toor';
const MARIA_DB: string = process.env.MONGO_DB || 'backend_interview_v2';

const REDIS_HOST: string = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT: number = +process.env.REDIS_PORT || 6379;
const REDIS_PW: string = process.env.REDIS_PW || 'toor';
const REDIS_DB: number = +process.env.REDIS_DB || 0;

const ISSUER: string = process.env.ISSUER || '';
const ACCESS_TOKEN_EXPIRATION_INTERVAL: number =
  +process.env.ACCESS_TOKEN_EXPIRATION_INTERVAL || 3;
const ACCESS_TOKEN_SECRET: string =
  process.env.ACCESS_TOKEN_SECRET || 'theTopSecret';
const REFRESH_TOKEN_EXPIRATION_INTERVAL: number =
  +process.env.REFRESH_TOKEN_EXPIRATION_INTERVAL || 24;

export {
  ENV,
  SERVICE_NAME,
  LOG_LEVEL,
  LOG_PATH,
  HTTP_DOMAIN,
  HTTP_PORT,
  MARIA_HOST,
  MARIA_PORT,
  MARIA_UN,
  MARIA_PW,
  MARIA_DB,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PW,
  REDIS_DB,
  ISSUER,
  ACCESS_TOKEN_EXPIRATION_INTERVAL,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRATION_INTERVAL,
};

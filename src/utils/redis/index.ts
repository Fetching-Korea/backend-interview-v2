import {
  createClient,
  RedisClientOptions,
  RedisClientType,
  RedisDefaultModules,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from 'redis';
import { REDIS_HOST, REDIS_PORT, REDIS_PW, REDIS_DB } from 'src/environments';

class RedisService {
  public source: RedisClientType<
    RedisDefaultModules & RedisModules,
    RedisFunctions,
    RedisScripts
  >;

  async createRedisOptions(): Promise<RedisClientOptions> {
    const options: RedisClientOptions = <RedisClientOptions>{
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: REDIS_PW,
      db: REDIS_DB,
      readonly: false,
      legacyMode: false,
      isolationPoolOptions: {
        max: 3,
        min: 1,
        maxWaitingClients: 1,
        fifo: true,
        priorityRange: 3,
        autostart: true,
      },
    };

    this.source = createClient(options);

    return options;
  }
}

const redisService = new RedisService();

export { redisService };

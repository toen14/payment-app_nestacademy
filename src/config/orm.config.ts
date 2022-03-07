import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Bri } from "src/v1/bri/entities/bri.entity";

import {
  typeOrmSynchronize,
  dbHost,
  dbName,
  dbPassword,
  dbPort,
  dbType,
  dbUsername,
} from "./env.config";

const typeOrmConfig: TypeOrmModuleOptions = {
  // @ts-ignore
  type: dbType,
  host: dbHost,
  port: dbPort,
  username: dbUsername,
  password: dbPassword,
  database: dbName,
  synchronize: typeOrmSynchronize,
  // autoLoadEntities: true,
  entities: [Bri],
};

export default typeOrmConfig;

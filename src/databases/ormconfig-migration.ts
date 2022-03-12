import databaseConfig from "src/v1/cummon/config/database.config";
import { Bri } from "src/v1/bri/entities/bri.entity";
import { User } from "src/v1/user/entities/user.entity";

module.exports = {
  host: databaseConfig().host,
  type: "mysql",
  port: databaseConfig().port,
  username: databaseConfig().username,
  password: databaseConfig().password,
  database: databaseConfig().database,
  syncronize: false,
  entities: [Bri, User],
  migrations: ["src/databases/migrations/*.ts"],
  cli: {
    migrationsDir: "src/databases/migrations",
  },
};

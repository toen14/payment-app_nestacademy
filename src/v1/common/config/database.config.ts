import { registerAs } from "@nestjs/config";

import { Bri } from "src/v1/bri/entities/bri.entity";
import { User } from "src/v1/user/entities/user.entity";
import { RefreshToken } from "src/v1/auth/entities/refresh-token.entity";

export default registerAs("database", () => ({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  syncronize: false,
  entities: [Bri, User, RefreshToken],
}));

import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { BriModule } from "./v1/bri/bri.module";
import configuration from "./v1/cummon/config/configuration";
import databaseConfig from "./v1/cummon/config/database.config";
import { UserModule } from "./v1/user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration, databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get("database"),
      inject: [ConfigService],
    }),
    RouterModule.register([
      {
        path: "/v1",
        children: [
          { path: "/", module: BriModule },
          { path: "/", module: UserModule },
        ],
      },
    ]),
    BriModule,
    UserModule,
  ],
})
export class AppModule {}

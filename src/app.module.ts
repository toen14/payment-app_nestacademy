import { Module } from "@nestjs/common";
import { APP_GUARD, RouterModule } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { BriModule } from "./v1/bri/bri.module";
import configuration from "./v1/common/config/configuration";
import databaseConfig from "./v1/common/config/database.config";
import { UserModule } from "./v1/user/user.module";
import { AuthModule } from "./v1/auth/auth.module";
import { JwtAuthGuard } from "./v1/auth/guards/jwt-auth.guard";

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
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bri } from "src/v1/bri/entities/bri.entity";
import databaseConfig from "src/v1/cummon/config/database.config";
import { User } from "src/v1/user/entities/user.entity";
import { BriSeedService } from "./bri-seed.service";
import { UserSeedService } from "./user-seed.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get("database"),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Bri, User]),
  ],

  providers: [BriSeedService, UserSeedService],
})
export class SeedModule {}

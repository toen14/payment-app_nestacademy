import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BriService } from "./bri.service";
import { BriController } from "./bri.controller";
import { Bri } from "./entities/bri.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Bri])],
  controllers: [BriController],
  providers: [BriService],
})
export class BriModule {}

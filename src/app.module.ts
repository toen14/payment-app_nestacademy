import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BriModule } from "./v1/bri/bri.module";
import typeOrmConfig from "./config/orm.config";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    RouterModule.register([
      {
        path: "/v1",
        children: [{ path: "/", module: BriModule }],
      },
    ]),
    BriModule,
  ],
})
export class AppModule {}

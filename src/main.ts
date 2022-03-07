import { NestFactory } from "@nestjs/core";
import {
  ExpressAdapter,
  NestExpressApplication,
} from "@nestjs/platform-express";

import { AppModule } from "./app.module";
import { port } from "./config/env.config";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix("/api");

  if (app.getHttpAdapter() instanceof ExpressAdapter) {
    app.disable("x-powered-by");
  }

  await app.listen(port);
}
bootstrap();

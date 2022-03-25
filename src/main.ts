import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  ExpressAdapter,
  NestExpressApplication,
} from "@nestjs/platform-express";

import { AppModule } from "./app.module";
import { SnackCaseInterceptor } from "./v1/common/interceptors/snake-case.interceptor";
// import { ValidationPipe } from "./v1/cummon/pipes/validation.pipe";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix("/api");

  if (app.getHttpAdapter() instanceof ExpressAdapter) {
    app.disable("x-powered-by");
    app.useGlobalInterceptors(new SnackCaseInterceptor());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  }

  await app.listen(app.get(ConfigService).get("port"));
}
bootstrap();

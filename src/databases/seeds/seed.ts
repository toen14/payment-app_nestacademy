import { NestFactory } from "@nestjs/core";

import { SeedModule } from "./seed.module";
import { UserSeedService } from "./user-seed.service";
import { BriSeedService } from "./bri-seed.service";

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedModule);

  try {
    await appContext.get(UserSeedService).seed();
    await appContext.get(BriSeedService).seed();
  } catch (error) {
    console.log("error", error);
  } finally {
    await appContext.close();
  }
}

bootstrap();

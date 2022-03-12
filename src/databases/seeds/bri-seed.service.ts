import faker from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bri } from "src/v1/bri/entities/bri.entity";
import { Repository } from "typeorm";

@Injectable()
export class BriSeedService {
  constructor(
    @InjectRepository(Bri)
    private briRepository: Repository<Bri>,
  ) {}

  async seed(): Promise<void> {
    const bris: Omit<Bri, "id" | "createtAt" | "updateAt">[] = [];

    for (let i = 0; i < 25; i++) {
      bris.push({
        amount: faker.datatype.number({ min: 10000 }),
      });
    }

    await this.briRepository.insert(bris);
  }
}

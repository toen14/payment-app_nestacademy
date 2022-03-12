import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { faker } from "@faker-js/faker";

import { Repository } from "typeorm";
import { Bri } from "src/v1/bri/entities/bri.entity";
import { User } from "src/v1/user/entities/user.entity";

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Bri)
    private briRepository: Repository<Bri>,
  ) {}

  async seed(): Promise<void> {
    const bris = await this.briRepository.find();
    const users: Omit<User, "id" | "createtAt" | "updateAt">[] = [];

    bris.forEach((bri) =>
      users.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        kabKota: faker.address.cityName(),
        bri: bri,
      }),
    );

    await this.userRepository.insert(users);
  }
}

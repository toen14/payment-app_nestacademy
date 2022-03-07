import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateBriDto } from "./dto/create-bri.dto";
import { UpdateBriDto } from "./dto/update-bri.dto";
import { Bri } from "./entities/bri.entity";

@Injectable()
export class BriService {
  constructor(
    @InjectRepository(Bri)
    private briRepository: Repository<Bri>,
  ) {}

  create(createBriDto: CreateBriDto): Promise<Bri> {
    return this.briRepository.save(createBriDto);
  }

  findAll(): Promise<Bri[]> {
    return this.briRepository.find();
  }

  findOne(id: number): Promise<Bri> {
    return this.briRepository.findOne(id);
  }

  update(id: number, updateBriDto: UpdateBriDto): Promise<UpdateResult> {
    return this.briRepository.update(id, updateBriDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.briRepository.delete(id);
  }
}

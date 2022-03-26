import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { RolesGuard } from "../auth/guards/role.guard";
import { RoleEnum } from "../common/config/role.enum";
import { Roles } from "../common/decorators/roles.decorator";
import { BriService } from "./bri.service";
import { CreateBriDto } from "./dto/create-bri.dto";
import { UpdateBriDto } from "./dto/update-bri.dto";

@UseGuards(RolesGuard)
@Controller("bri")
export class BriController {
  constructor(private readonly briService: BriService) {}

  @Post()
  create(@Body() createBriDto: CreateBriDto) {
    return this.briService.create(createBriDto);
  }

  @Roles(RoleEnum.Admin)
  @Get()
  findAll() {
    return this.briService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.briService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateBriDto: UpdateBriDto) {
    return this.briService.update(id, updateBriDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.briService.remove(id);
  }
}

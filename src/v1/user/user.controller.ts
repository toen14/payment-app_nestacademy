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
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RoleEnum } from "../common/config/role.enum";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../auth/guards/role.guard";
import { PublicGuard } from "../common/decorators/public.decorators";

@UseGuards(RolesGuard)
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @PublicGuard()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles(RoleEnum.Admin)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.userService.remove(id);
  }
}

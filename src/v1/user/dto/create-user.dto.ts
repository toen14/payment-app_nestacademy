import { IsEmail, IsNotEmpty, IsString, IsEnum } from "class-validator";

import { RoleEnum } from "src/v1/common/config/role.enum";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  kabKota: string;

  @IsEnum(RoleEnum)
  @IsNotEmpty()
  role: RoleEnum;

  @IsString()
  @IsNotEmpty()
  password: string;
}

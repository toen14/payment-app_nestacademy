import { IsInt, IsNotEmpty } from "class-validator";

export class CreateBriDto {
  @IsInt()
  @IsNotEmpty()
  amount: number;
}

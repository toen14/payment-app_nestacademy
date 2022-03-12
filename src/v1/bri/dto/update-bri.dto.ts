import { IsInt } from "class-validator";

export class UpdateBriDto {
  @IsInt()
  amount: number;
}

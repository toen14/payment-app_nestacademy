import { PartialType } from "@nestjs/mapped-types";
import { CreateBriDto } from "./create-bri.dto";

export class UpdateBriDto extends PartialType(CreateBriDto) {}

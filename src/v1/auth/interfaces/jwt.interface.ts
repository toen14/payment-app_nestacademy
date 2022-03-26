import { RoleEnum } from "src/v1/common/config/role.enum";

export interface JWTTokenInterface {
  name: string;
  sub: number;
  role: RoleEnum;
  refresh_token_id: string;
  iat?: number;
  exp?: number;
}

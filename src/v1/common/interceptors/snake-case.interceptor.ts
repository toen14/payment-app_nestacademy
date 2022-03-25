import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Bri } from "src/v1/bri/entities/bri.entity";
import { User } from "src/v1/user/entities/user.entity";

export interface Response<T> {
  data: T;
}

@Injectable()
export class SnackCaseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof Bri) {
          return {
            id: data.id,
            amount: data.amount,
            createt_at: data.createtAt,
            update_at: data.updateAt,
          };
        }

        if (Array.isArray(data) && data[0] instanceof Bri) {
          return data.map((bri) => ({
            id: bri.id,
            amount: bri.amount,
            createt_at: bri.createtAt,
            update_at: bri.updateAt,
          }));
        }

        if (data instanceof User) {
          return {
            id: data.id,
            email: data.email,
            name: data.name,
            bri_id: data.bri,
            role: data.role,
            createt_at: data.createtAt,
            update_at: data.updateAt,
          };
        }

        if (Array.isArray(data) && data[0] instanceof User) {
          return data.map((user: User) => ({
            id: user.id,
            email: user.email,
            name: user.name,
            bri_id: user.bri,
            role: user.role,
            createt_at: user.createtAt,
            update_at: user.updateAt,
          }));
        }

        return data;
      }),
    );
  }
}

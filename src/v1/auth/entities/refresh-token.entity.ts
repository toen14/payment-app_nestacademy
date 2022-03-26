import { User } from "src/v1/user/entities/user.entity";
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  BeforeInsert,
} from "typeorm";

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ generated: "uuid" })
  refreshTokenId: string;

  @Column()
  expiredAt: Date;

  // default refresh token expire 30 day
  @BeforeInsert()
  generateExpaireRefreshToken() {
    this.expiredAt = new Date(86400000 * 30 + Date.now());
  }

  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User;
}

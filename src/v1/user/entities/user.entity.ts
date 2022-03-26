import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";

import { Bri } from "src/v1/bri/entities/bri.entity";
import { RoleEnum } from "../../common/config/role.enum";
import { RefreshToken } from "src/v1/auth/entities/refresh-token.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  kabKota: string;

  @Column({ type: "enum", enum: RoleEnum })
  role: RoleEnum;

  @Column()
  password: string;

  @CreateDateColumn()
  createtAt: string;

  @UpdateDateColumn()
  updateAt: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(6);
    if (this.password) {
      this.password = await bcrypt.hash(password || this.password, salt);
    }
  }

  @OneToOne(() => Bri)
  @JoinColumn()
  bri: Bri;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken;
}

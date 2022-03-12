import { Bri } from "src/v1/bri/entities/bri.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @CreateDateColumn()
  createtAt: string;

  @UpdateDateColumn()
  updateAt: string;

  @OneToOne(() => Bri)
  @JoinColumn()
  bri: Bri;
}

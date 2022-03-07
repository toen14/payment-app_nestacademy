import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Bri {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userId: number;

  @Column()
  amount: number;

  @CreateDateColumn()
  createtAt: string;

  @UpdateDateColumn()
  updateAt: string;
}

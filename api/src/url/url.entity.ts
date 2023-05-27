import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";


@Entity()
export class Url {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date | null;

  @Column("varchar", { length: 255, unique: true})
  url!: string;

  @Column("varchar", { length: 255, unique: true})
  code!: string;
}
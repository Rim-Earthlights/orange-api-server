// ユーザーテーブル
import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryColumn, BaseEntity } from "typeorm";

@Entity({ engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci' })
export class User extends BaseEntity {
  @PrimaryColumn({ type: "bigint" })
  id: string;

  @Column()
  user_name: string;

  @Column({ nullable: true })
  nick_name: string;

  @Column({ nullable: true })
  gender: Gender;

  @Column({ nullable: true })
  address: string;

  @Column({ type: "datetime", nullable: true })
  birth_date: Date;

  @Column({ default: 0 })
  pick_left: number;

  @Column({ default: 3 })
  voice_id: number;

  @Column({ type: "float", default: 1.0 })
  voice_speed: number;

  @Column({ default: 0 })
  grant: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export enum Gender {
  MALE = 1,
  FEMALE = 2,
  OTHER = 3,
}
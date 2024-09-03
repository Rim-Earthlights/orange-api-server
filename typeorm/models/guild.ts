// ギルドテーブル
import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryColumn, BaseEntity } from "typeorm";

@Entity({ engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci' })
export class Guild extends BaseEntity {
  @PrimaryColumn({ type: "bigint" })
  id: string;

  @Column()
  name: string;

  @Column("bigint", { array: true })
  lobby_ids: string[];

  @Column({ type: "bigint" })
  inactive_id: string;

  @Column("bigint", { array: true })
  exclude_ids: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
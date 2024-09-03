// ログテーブル
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity({ engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci' })
export class Log extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: string;

  @Column({ type: "bigint", nullable: true })
  guild_id: string | null;

  @Column({ type: "bigint", nullable: true })
  channel_id: string | null;

  @Column({ type: "bigint", nullable: true })
  user_id: string | null;

  @Column()
  level: string;

  @Column()
  event: string;

  @Column("text")
  message: string;

  @CreateDateColumn()
  created_at: Date;
}
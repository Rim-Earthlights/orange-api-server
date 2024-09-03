
// ギルドテーブル
import { Entity, PrimaryColumn, BaseEntity, Column } from "typeorm";

@Entity({ engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci' })
export class Chat extends BaseEntity {
  @PrimaryColumn({ type: "bigint" })
  id: string;

  @Column({ type: "bigint" })
  guild_id: string;

  @Column({ type: "bigint" })
  channel_id: string;

  @Column({ type: "string", array: true })
  messages: string[];

}
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Users } from './users';
import { Item } from './item';

@Entity({ engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci' })
export class Gacha extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'bigint', width: 20 })
  user_id!: string;

  @Column({ type: 'bigint' })
  item_id!: number;

  @Column({ type: 'datetime', nullable: false })
  pick_date!: Date;

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  is_used!: number;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deleted_at: Date | null = null;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  created_at!: Date;

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  users!: Relation<Users>;

  @ManyToOne(() => Item, (item) => item.id)
  @JoinColumn({ name: 'item_id', referencedColumnName: 'id' })
  items!: Relation<Item>;
}

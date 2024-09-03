import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Repository } from 'typeorm';
import { Guild } from 'typeorm/models';
import { TypeOrm } from 'typeorm/typeorm';

@Injectable()
export class GuildService {
  private repository: Repository<Guild>;
  constructor() {
    this.repository = TypeOrm.dataSource.getRepository(Guild);
  }

  /**
   * サーバー情報を取得します.
   * @param id サーバーID
   * @returns サーバー情報
   */
  async get(id: string): Promise<Guild> {
    return await this.repository.findOne({ where: { id } });
  }

  async getAll(): Promise<Guild[]> {
    return await this.repository.find();
  }
}

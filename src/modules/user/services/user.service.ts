import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'typeorm/models';
import { TypeOrm } from 'typeorm/typeorm';

@Injectable()
export class UserService {
  private readonly repository: Repository<User>;
  constructor() {
    this.repository = TypeOrm.dataSource.getRepository(User);
  }

  async get(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async create(user: {
    id: string;
    user_name: string;
    nick_name?: string;
    gender?: number;
    address?: string;
    birth_date?: Date;
  }): Promise<string> {
    const result = await this.repository.save(user);
    return result.id;
  }

  async update(user: {
    id: string;
    user_name?: string;
    nick_name?: string;
    gender?: number;
    address?: string;
    birth_date?: Date;
  }): Promise<boolean> {
    const result = await this.repository.update(user.id, user);
    return result.affected === 1;
  }
}

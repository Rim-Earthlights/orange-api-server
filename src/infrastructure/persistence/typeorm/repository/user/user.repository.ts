import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../entities/users';
import { IUserRepository } from '../../../../../domain/repository/user.interface';
import { UserSetting } from '../../entities';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(UserSetting)
    private readonly userSettingRepository: Repository<UserSetting>
  ) {}

  async findByUserIdAndGuildId(userId: string, guildId: string): Promise<Users | null> {
    return await this.userRepository.findOne({
      where: {
        id: userId,
        guild_id: guildId,
      },
    });
  }

  async getGuildUsers(guildId: string): Promise<Users[]> {
    return await this.userRepository.find({
      where: {
        guild_id: guildId,
      },
    });
  }

  async findByUserId(userId: string): Promise<Users | null> {
    return await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['userSetting'],
    });
  }

  async updateUser(user: Partial<Users>): Promise<{ result: number }> {
    const result = await this.userRepository.update(user.id, user);
    return { result: result.affected ?? 0 };
  }

  async createUser(user: Partial<Users>): Promise<boolean> {
    const result = await this.userRepository.save(user);
    return result !== null;
  }

  async deleteUser(userId: string): Promise<{ result: number }> {
    const result = await this.userRepository.delete(userId);
    return { result: result.affected ?? 0 };
  }

  async findUserSetting(userId: string): Promise<UserSetting | null> {
    return await this.userSettingRepository.findOne({
      where: {
        user_id: userId,
      },
    });
  }

  async updateUserSetting(userId: string, userSetting: Partial<UserSetting>): Promise<{ result: number }> {
    const result = await this.userSettingRepository.update(userId, userSetting);
    return { result: result.affected ?? 0 };
  }

  async createUserSetting(userId: string, userSetting: Partial<UserSetting>): Promise<boolean> {
    const result = await this.userSettingRepository.save({ ...userSetting, id: userId });
    return result !== null;
  }
}

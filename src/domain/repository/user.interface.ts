import { UserSetting } from 'src/infrastructure/persistence/typeorm/entities';
import { Users } from '../../infrastructure/persistence/typeorm/entities/users';

export interface IUserRepository {
  findByUserIdAndGuildId(userId: string, guildId: string): Promise<Users | null>;
  getGuildUsers(guildId: string): Promise<Users[]>;
  findByUserId(userId: string): Promise<Users | null>;
  updateUser(user: Partial<Users>): Promise<{ result: number }>;
  createUser(user: Partial<Users>): Promise<boolean>;
  deleteUser(userId: string): Promise<{ result: number }>;
  findUserSetting(userId: string): Promise<UserSetting | null>;
  updateUserSetting(userId: string, userSetting: Partial<UserSetting>): Promise<{ result: number }>;
  createUserSetting(userId: string, userSetting: Partial<UserSetting>): Promise<boolean>;
}

export const IUserRepository = Symbol('IUserRepository');

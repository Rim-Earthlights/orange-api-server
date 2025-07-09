import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UserController } from './user.controller';
import { IUserRepository } from '../../../domain/repository/user.interface';
import { Users, UsersType } from '../../persistence/typeorm/entities/users';

describe('UserController', () => {
  let controller: UserController;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  const mockUser: Users = {
    id: '123456789',
    guild_id: '987654321',
    user_name: 'TestUser',
    type: UsersType.MEMBER,
    last_pick_date: new Date('2023-01-01'),
    pick_left: 5,
    voice_channel_data: null,
    deleted_at: null,
    updated_at: new Date('2023-01-01'),
    created_at: new Date('2023-01-01'),
  } as Users;

  beforeEach(async () => {
    mockUserRepository = {
      findByUserIdAndGuildId: jest.fn(),
      getGuildUsers: jest.fn(),
      findByUserId: jest.fn(),
      updateUser: jest.fn(),
      createUser: jest.fn(),
      deleteUser: jest.fn(),
      findUserSetting: jest.fn(),
      updateUserSetting: jest.fn(),
      createUserSetting: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: IUserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  describe('getUser', () => {
    it('should return a user when valid userId and guildId are provided', async () => {
      mockUserRepository.findByUserIdAndGuildId.mockResolvedValue(mockUser);

      const result = await controller.getUser('123456789', '987654321');

      expect(result).toBe(mockUser);
      expect(mockUserRepository.findByUserIdAndGuildId).toHaveBeenCalledWith('123456789', '987654321');
    });

    it('should throw NotFoundException when userId is not provided', async () => {
      await expect(controller.getUser('', '987654321')).rejects.toThrow(
        new NotFoundException('user_id and guild_id are required')
      );
    });

    it('should throw NotFoundException when guildId is not provided', async () => {
      await expect(controller.getUser('123456789', '')).rejects.toThrow(
        new NotFoundException('user_id and guild_id are required')
      );
    });

    it('should throw NotFoundException when both userId and guildId are not provided', async () => {
      await expect(controller.getUser('', '')).rejects.toThrow(
        new NotFoundException('user_id and guild_id are required')
      );
    });

    it('should throw NotFoundException when user is not found', async () => {
      mockUserRepository.findByUserIdAndGuildId.mockResolvedValue(null);

      await expect(controller.getUser('123456789', '987654321')).rejects.toThrow(
        new NotFoundException('User not found')
      );
      expect(mockUserRepository.findByUserIdAndGuildId).toHaveBeenCalledWith('123456789', '987654321');
    });

    it('should handle repository errors gracefully', async () => {
      const repositoryError = new Error('Database connection failed');
      mockUserRepository.findByUserIdAndGuildId.mockRejectedValue(repositoryError);

      await expect(controller.getUser('123456789', '987654321')).rejects.toThrow(repositoryError);
    });
  });
});

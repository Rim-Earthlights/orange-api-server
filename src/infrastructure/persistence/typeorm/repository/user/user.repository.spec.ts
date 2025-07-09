import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { Users, UsersType } from '../../entities/users';

describe('UserRepository', () => {
  let repository: UserRepository;
  let mockTypeOrmRepository: jest.Mocked<Repository<Users>>;

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
    mockTypeOrmRepository = {
      findOne: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(Users),
          useValue: mockTypeOrmRepository,
        },
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
  });

  describe('findByUserIdAndGuildId', () => {
    it('should return a user when found', async () => {
      mockTypeOrmRepository.findOne.mockResolvedValue(mockUser);

      const result = await repository.findByUserIdAndGuildId('123456789', '987654321');

      expect(result).toBe(mockUser);
      expect(mockTypeOrmRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: '123456789',
          guild_id: '987654321',
        },
      });
    });

    it('should return null when user is not found', async () => {
      mockTypeOrmRepository.findOne.mockResolvedValue(null);

      const result = await repository.findByUserIdAndGuildId('123456789', '987654321');

      expect(result).toBeNull();
      expect(mockTypeOrmRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: '123456789',
          guild_id: '987654321',
        },
      });
    });

    it('should handle database errors', async () => {
      const databaseError = new Error('Database connection failed');
      mockTypeOrmRepository.findOne.mockRejectedValue(databaseError);

      await expect(repository.findByUserIdAndGuildId('123456789', '987654321')).rejects.toThrow(databaseError);
    });
  });
});

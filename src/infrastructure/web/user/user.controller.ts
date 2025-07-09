import { Controller, Get, Inject, Query, NotFoundException, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repository/user.interface';
import { Users } from '../../persistence/typeorm/entities/users';
import { UserSetting } from '../../persistence/typeorm/entities';

@Controller('user')
export class UserController {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  @Get()
  async getUser(@Query('user_id') userId: string, @Query('guild_id') guildId: string): Promise<Users> {
    if (!userId || !guildId) {
      throw new NotFoundException('user_id and guild_id are required');
    }

    const user = await this.userRepository.findByUserIdAndGuildId(userId, guildId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Post(':user_id')
  async createUser(@Body() user: Users, @Param('user_id') userId: string): Promise<boolean> {
    return await this.userRepository.createUser({ ...user, id: userId });
  }

  @Put(':user_id')
  async updateUser(@Body() user: Users, @Param('user_id') userId: string): Promise<{ result: number }> {
    return await this.userRepository.updateUser({ ...user, id: userId });
  }

  @Delete(':user_id')
  async deleteUser(@Param('user_id') userId: string): Promise<{ result: number }> {
    return await this.userRepository.deleteUser(userId);
  }

  @Get('guild/:guild_id')
  async getGuildUsers(@Param('guild_id') guildId: string): Promise<Users[]> {
    return await this.userRepository.getGuildUsers(guildId);
  }

  @Get(':user_id')
  async getByUserId(@Param('user_id') userId: string): Promise<Users> {
    return await this.userRepository.findByUserId(userId);
  }

  @Get('setting/:user_id')
  async getUserSetting(@Param('user_id') userId: string): Promise<UserSetting> {
    return await this.userRepository.findUserSetting(userId);
  }

  @Post('setting/:user_id')
  async createUserSetting(@Body() userSetting: UserSetting, @Param('user_id') userId: string): Promise<boolean> {
    return await this.userRepository.createUserSetting(userId, userSetting);
  }

  @Put('setting/:user_id')
  async updateUserSetting(
    @Body() userSetting: UserSetting,
    @Param('user_id') userId: string
  ): Promise<{ result: number }> {
    return await this.userRepository.updateUserSetting(userId, userSetting);
  }
}

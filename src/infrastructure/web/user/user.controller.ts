import {
  Controller,
  Get,
  Inject,
  Query,
  NotFoundException,
  Post,
  Body,
  Put,
  Delete,
  Param,
  applyDecorators,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody, ApiExtraModels } from '@nestjs/swagger';
import { IUserRepository } from '../../../domain/repository/user.interface';
import { Users } from '../../persistence/typeorm/entities/users';
import { UserSetting } from '../../persistence/typeorm/entities';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get user by user ID and guild ID' })
  @ApiQuery({ name: 'user_id', description: 'User ID', required: true })
  @ApiQuery({ name: 'guild_id', description: 'Guild ID', required: true })
  @ApiResponse({ status: 200, description: 'User found', type: Users })
  @ApiResponse({ status: 404, description: 'User not found' })
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
  @ApiOperation({ summary: 'Create a new user' })
  @ApiParam({ name: 'user_id', description: 'User ID' })
  @ApiBody({ type: Users })
  @ApiResponse({ status: 201, description: 'User created successfully', type: Boolean })
  async createUser(@Body() user: Users, @Param('user_id') userId: string): Promise<boolean> {
    return await this.userRepository.createUser({ ...user, id: userId });
  }

  @Put(':user_id')
  @ApiOperation({ summary: 'Update user information' })
  @ApiParam({ name: 'user_id', description: 'User ID' })
  @ApiBody({ type: Users })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  async updateUser(@Body() user: Users, @Param('user_id') userId: string): Promise<{ result: number }> {
    return await this.userRepository.updateUser({ ...user, id: userId });
  }

  @Delete(':user_id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'user_id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  async deleteUser(@Param('user_id') userId: string): Promise<{ result: number }> {
    return await this.userRepository.deleteUser(userId);
  }

  @Get('guild/:guild_id')
  @ApiOperation({ summary: 'Get all users in a guild' })
  @ApiParam({ name: 'guild_id', description: 'Guild ID' })
  @ApiResponse({ status: 200, description: 'Users found', type: [Users] })
  async getGuildUsers(@Param('guild_id') guildId: string): Promise<Users[]> {
    return await this.userRepository.getGuildUsers(guildId);
  }

  @Get(':user_id')
  @ApiOperation({ summary: 'Get user by user ID' })
  @ApiParam({ name: 'user_id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found', type: Users })
  async getByUserId(@Param('user_id') userId: string): Promise<Users> {
    return await this.userRepository.findByUserId(userId);
  }

  @Get('setting/:user_id')
  @ApiOperation({ summary: 'Get user settings' })
  @ApiParam({ name: 'user_id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User settings found', type: UserSetting })
  async getUserSetting(@Param('user_id') userId: string): Promise<UserSetting> {
    return await this.userRepository.findUserSetting(userId);
  }

  @Post('setting/:user_id')
  @ApiOperation({ summary: 'Create user settings' })
  @ApiParam({ name: 'user_id', description: 'User ID' })
  @ApiBody({ type: UserSetting })
  @ApiResponse({ status: 201, description: 'User settings created successfully', type: Boolean })
  async createUserSetting(@Body() userSetting: UserSetting, @Param('user_id') userId: string): Promise<boolean> {
    return await this.userRepository.createUserSetting(userId, userSetting);
  }

  @Put('setting/:user_id')
  @ApiOperation({ summary: 'Update user settings' })
  @ApiParam({ name: 'user_id', description: 'User ID' })
  @ApiBody({ type: UserSetting })
  @ApiResponse({ status: 200, description: 'User settings updated successfully' })
  async updateUserSetting(
    @Body() userSetting: UserSetting,
    @Param('user_id') userId: string
  ): Promise<{ result: number }> {
    return await this.userRepository.updateUserSetting(userId, userSetting);
  }
}

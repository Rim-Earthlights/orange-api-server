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
import { UserResponseDto } from './dto/user-response.dto';
import { UserSettingResponseDto } from './dto/user-setting-response.dto';
import { UserRequestDto } from './dto/user-request.dto';
import { UserSettingRequestDto } from './dto/user-setting-request.dto';

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
  @ApiResponse({ status: 200, description: 'User found', type: UserResponseDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUser(@Query('user_id') userId: string, @Query('guild_id') guildId: string): Promise<UserResponseDto> {
    if (!userId || !guildId) {
      throw new NotFoundException('user_id and guild_id are required');
    }

    const user = await this.userRepository.findByUserIdAndGuildId(userId, guildId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Get(':user_id')
  @ApiOperation({ summary: 'Get user by user ID' })
  @ApiParam({ name: 'user_id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found', type: UserResponseDto })
  async getByUserId(@Param('user_id') userId: string): Promise<UserResponseDto> {
    return await this.userRepository.findByUserId(userId);
  }

  @Get('guild/:guild_id')
  @ApiOperation({ summary: 'Get all users in a guild' })
  @ApiParam({ name: 'guild_id', description: 'Guild ID' })
  @ApiResponse({ status: 200, description: 'Users found', type: [UserResponseDto] })
  async getGuildUsers(@Param('guild_id') guildId: string): Promise<UserResponseDto[]> {
    return await this.userRepository.getGuildUsers(guildId);
  }

  @Post(':user_id')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiParam({ name: 'user_id', description: 'User ID' })
  @ApiBody({ type: UserRequestDto })
  @ApiResponse({ status: 201, description: 'User created successfully', type: Boolean })
  async createUser(@Body() user: UserRequestDto, @Param('user_id') userId: string): Promise<boolean> {
    return await this.userRepository.createUser({ ...user, id: userId });
  }

  @Put(':user_id')
  @ApiOperation({ summary: 'Update user information' })
  @ApiParam({ name: 'user_id', description: 'User ID' })
  @ApiBody({ type: UserRequestDto })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  async updateUser(@Body() user: UserRequestDto, @Param('user_id') userId: string): Promise<{ result: number }> {
    return await this.userRepository.updateUser({ ...user, id: userId });
  }

  @Delete(':user_id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'user_id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  async deleteUser(@Param('user_id') userId: string): Promise<{ result: number }> {
    return await this.userRepository.deleteUser(userId);
  }

  @Get('setting/:user_id')
  @ApiOperation({ summary: 'Get user settings' })
  @ApiParam({ name: 'user_id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User settings found', type: UserSettingResponseDto })
  async getUserSetting(@Param('user_id') userId: string): Promise<UserSettingResponseDto> {
    return await this.userRepository.findUserSetting(userId);
  }

  @Post('setting/:user_id')
  @ApiOperation({ summary: 'Create user settings' })
  @ApiParam({ name: 'user_id', description: 'User ID' })
  @ApiBody({ type: UserSettingRequestDto })
  @ApiResponse({ status: 201, description: 'User settings created successfully', type: Boolean })
  async createUserSetting(
    @Body() userSetting: UserSettingRequestDto,
    @Param('user_id') userId: string
  ): Promise<boolean> {
    return await this.userRepository.createUserSetting(userId, userSetting);
  }

  @Put('setting/:user_id')
  @ApiOperation({ summary: 'Update user settings' })
  @ApiParam({ name: 'user_id', description: 'User ID' })
  @ApiBody({ type: UserSettingRequestDto })
  @ApiResponse({ status: 200, description: 'User settings updated successfully' })
  async updateUserSetting(
    @Body() userSetting: UserSettingRequestDto,
    @Param('user_id') userId: string
  ): Promise<{ result: number }> {
    return await this.userRepository.updateUserSetting(userId, userSetting);
  }
}

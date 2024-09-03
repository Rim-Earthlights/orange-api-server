import { Body, Controller, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { Transform } from 'class-transformer';
import { User } from 'typeorm/models';
import { Gender } from 'typeorm/models/user';

@ApiTags('user')
@Controller('/user')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/')
  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({ status: HttpStatus.OK })
  async getAll(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Transform(({ value }) => value.toString())
  @Get('/:id')
  @ApiOperation({ summary: 'get user by id' })
  @ApiResponse({ status: 200, description: 'OK' })
  async get(@Param('id') id: string): Promise<User> {
    return await this.userService.get(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'create user' })
  @ApiResponse({ status: 200, description: 'created user', type: String })
  async create(@Body() user: User): Promise<string> {
    return await this.userService.create(user);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'update user' })
  @ApiResponse({ status: 200, description: 'updated user', })
  async update(@Param('id') id: string, @Body() user: User): Promise<{ result: boolean }> {
    const result = await this.userService.update(user);
    return { result };
  }
}

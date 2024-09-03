import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GuildService } from '../services/guild.service';
import { Transform } from 'class-transformer';
import { Guild } from 'typeorm/models';

@ApiTags('guild')
@Controller('/guild')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class GuildController {
  constructor(private readonly guildService: GuildService) { }

  @Transform(({ value }) => value.toString())
  @Get('/:id')
  @ApiOperation({ summary: 'get guild by id' })
  @ApiResponse({ status: 200, description: 'OK' })
  async get(@Param('id') id: string): Promise<Guild> {
    return await this.guildService.get(id);
  }

  @Get('/')
  @ApiOperation({ summary: 'get all guilds' })
  @ApiResponse({ status: 200, description: 'OK' })
  async getAll(): Promise<Guild[]> {
    return await this.guildService.getAll();
  }
}

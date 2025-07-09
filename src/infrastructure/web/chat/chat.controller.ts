import { Controller, Get, Inject, NotFoundException, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IChatRepository } from '../../../domain/repository/chat.interface';
import { ChatHistory } from '../../persistence/typeorm/entities';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(
    @Inject(IChatRepository)
    private readonly chatRepository: IChatRepository
  ) {}

  @Get('history')
  @ApiOperation({ summary: 'Get chat history' })
  @ApiQuery({ name: 'channel_id', description: 'Channel ID', required: true })
  @ApiQuery({ name: 'page', description: 'Page', required: true })
  @ApiQuery({ name: 'limit', description: 'Limit', required: true })
  @ApiResponse({ status: 200, description: 'Chat history found', type: ChatHistory })
  async getChatHistory(
    @Query('channel_id') channelId: string,
    @Query('page') page: number,
    @Query('limit') limit: number
  ): Promise<ChatHistory[]> {
    const result = await this.chatRepository.findChatHistory(channelId, page, limit);
    return result;
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../guards/auth.guard';
import { ChatService } from '../services/chat.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('chat')
@Controller('/chat')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @Get('/test')
  @ApiOperation({ summary: 'Test' })
  @ApiResponse({ status: 200, description: 'OK' })
  test(): string {
    return this.chatService.test();
  }
}

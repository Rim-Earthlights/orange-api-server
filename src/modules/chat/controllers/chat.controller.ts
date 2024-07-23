import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../guards/auth.guard';
import { ChatService } from '../services/chat.service';

@Controller('/chat')
@UseGuards(AuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/test')
  test(): string {
    return this.chatService.test();
  }
}

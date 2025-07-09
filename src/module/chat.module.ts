import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatHistory } from '../infrastructure/persistence/typeorm/entities';
import { ChatController } from '../infrastructure/web/chat/chat.controller';
import { IChatRepository } from '../domain/repository/chat.interface';
import { ChatRepository } from '../infrastructure/persistence/typeorm/repository/chat/chat.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChatHistory])],
  controllers: [ChatController],
  providers: [{ provide: IChatRepository, useClass: ChatRepository }],
  exports: [IChatRepository],
})
export class ChatModule {}

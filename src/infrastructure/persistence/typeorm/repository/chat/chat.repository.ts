import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatHistory } from '../../entities';
import { IChatRepository } from '../../../../../domain/repository/chat.interface';

@Injectable()
export class ChatRepository implements IChatRepository {
  constructor(
    @InjectRepository(ChatHistory)
    private readonly chatHistoryRepository: Repository<ChatHistory>
  ) {}

  /**
   * 指定IDのチャット履歴を取得する
   * @param channelId
   * @param page
   * @param limit
   * @returns
   */
  async findChatHistory(channelId: string, page: number, limit: number): Promise<ChatHistory[]> {
    return await this.chatHistoryRepository.find({
      where: { channel_id: channelId },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}

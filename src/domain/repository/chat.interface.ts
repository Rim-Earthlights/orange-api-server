import { ChatHistory } from 'src/infrastructure/persistence/typeorm/entities';

export interface IChatRepository {
  findChatHistory(channelId: string, page: number, limit: number): Promise<ChatHistory[]>;
}

export const IChatRepository = Symbol('IChatRepository');

import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  test(): string {
    return 'Hello World!';
  }
}

import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';

export const routes = [
  ChatModule,
];

@Module({ imports: routes })
export class RouterModule {}
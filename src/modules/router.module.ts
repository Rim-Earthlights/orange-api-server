import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { GuildModule } from './guild/guild.module';

const routes = [ChatModule, UserModule, GuildModule];

@Module({ imports: routes })
export class RouterModule { }

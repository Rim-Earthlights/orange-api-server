import { ApiProperty } from '@nestjs/swagger';
import { UsersType, VoiceChannelData } from '../../../persistence/typeorm/entities/users';

export class UserRequestDto {
  @ApiProperty({ description: 'User ID', required: false, nullable: true })
  id?: string | null;

  @ApiProperty({ description: 'Guild ID', required: false, nullable: true })
  guild_id?: string | null;

  @ApiProperty({ description: 'User name', required: false, nullable: true })
  user_name?: string | null;

  @ApiProperty({ description: 'User type', enum: UsersType, required: false, nullable: true })
  type?: UsersType | null;

  @ApiProperty({ description: 'Last pick date', required: false, nullable: true })
  last_pick_date?: Date | null;

  @ApiProperty({ description: 'Pick left count', required: false, nullable: true })
  pick_left?: number | null;

  @ApiProperty({ description: 'Voice channel data', required: false, nullable: true })
  voice_channel_data?: VoiceChannelData[] | null;

  @ApiProperty({ description: 'Deleted at', required: false, nullable: true })
  deleted_at?: Date | null;

  @ApiProperty({ description: 'Updated at', required: false, nullable: true })
  updated_at?: Date | null;

  @ApiProperty({ description: 'Created at', required: false, nullable: true })
  created_at?: Date | null;
}
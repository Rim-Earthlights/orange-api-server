import { ApiProperty } from '@nestjs/swagger';
import { UsersType, VoiceChannelData } from '../../../persistence/typeorm/entities/users';

export class UserResponseDto {
  @ApiProperty({ description: 'User ID' })
  id: string;

  @ApiProperty({ description: 'Guild ID' })
  guild_id: string;

  @ApiProperty({ description: 'User name', nullable: true })
  user_name: string | null;

  @ApiProperty({ description: 'User type', enum: UsersType })
  type: UsersType;

  @ApiProperty({ description: 'Last pick date', nullable: true })
  last_pick_date: Date | null;

  @ApiProperty({ description: 'Pick left count' })
  pick_left: number;

  @ApiProperty({ description: 'Voice channel data', nullable: true })
  voice_channel_data: VoiceChannelData[] | null;

  @ApiProperty({ description: 'Deleted at', nullable: true })
  deleted_at: Date | null;

  @ApiProperty({ description: 'Updated at', nullable: true })
  updated_at: Date | null;

  @ApiProperty({ description: 'Created at' })
  created_at: Date;
}
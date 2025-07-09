import { ApiProperty } from '@nestjs/swagger';
import { ModelType } from '../../../persistence/typeorm/entities/userSetting';

export class UserSettingResponseDto {
  @ApiProperty({ description: 'User ID' })
  user_id: string;

  @ApiProperty({ description: 'Nickname', nullable: true })
  nickname: string | null;

  @ApiProperty({ description: 'Prefecture', nullable: true })
  pref: string | null;

  @ApiProperty({ description: 'Birth date', nullable: true })
  birth_date: Date | null;

  @ApiProperty({ description: 'Model type', enum: Object.values(ModelType) })
  model_type: (typeof ModelType)[keyof typeof ModelType];

  @ApiProperty({ description: 'Voice ID' })
  voice_id: number;

  @ApiProperty({ description: 'Voice speed' })
  voice_speed: number;

  @ApiProperty({ description: 'Voice pitch' })
  voice_pitch: number;

  @ApiProperty({ description: 'Voice intonation' })
  voice_intonation: number;

  @ApiProperty({ description: 'Deleted at', nullable: true })
  deleted_at: Date | null;

  @ApiProperty({ description: 'Updated at', nullable: true })
  updated_at: Date | null;

  @ApiProperty({ description: 'Created at' })
  created_at: Date;
}
import { ApiProperty } from '@nestjs/swagger';
import { ModelType } from '../../../persistence/typeorm/entities/userSetting';

export class UserSettingRequestDto {
  @ApiProperty({ description: 'User ID', required: false, nullable: true })
  user_id?: string | null;

  @ApiProperty({ description: 'Nickname', required: false, nullable: true })
  nickname?: string | null;

  @ApiProperty({ description: 'Prefecture', required: false, nullable: true })
  pref?: string | null;

  @ApiProperty({ description: 'Birth date', required: false, nullable: true })
  birth_date?: Date | null;

  @ApiProperty({ description: 'Model type', enum: Object.values(ModelType), required: false, nullable: true })
  model_type?: (typeof ModelType)[keyof typeof ModelType] | null;

  @ApiProperty({ description: 'Voice ID', required: false, nullable: true })
  voice_id?: number | null;

  @ApiProperty({ description: 'Voice speed', required: false, nullable: true })
  voice_speed?: number | null;

  @ApiProperty({ description: 'Voice pitch', required: false, nullable: true })
  voice_pitch?: number | null;

  @ApiProperty({ description: 'Voice intonation', required: false, nullable: true })
  voice_intonation?: number | null;

  @ApiProperty({ description: 'Deleted at', required: false, nullable: true })
  deleted_at?: Date | null;

  @ApiProperty({ description: 'Updated at', required: false, nullable: true })
  updated_at?: Date | null;

  @ApiProperty({ description: 'Created at', required: false, nullable: true })
  created_at?: Date | null;
}
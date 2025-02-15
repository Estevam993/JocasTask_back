import { IsInt, IsString } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  status: string;

  @IsString()
  description: string;

  @IsInt()
  frame_id: number;
}

import { IsString, IsInt } from 'class-validator';

export class CreateFrameDto {
  @IsString()
  status: string

  @IsString()
  description: string;

  @IsInt()
  user_id: number;

}
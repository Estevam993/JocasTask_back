import { IsInt, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  status: string;

  @IsString()
  description: string;

  @IsInt()
  column_id: number;
}

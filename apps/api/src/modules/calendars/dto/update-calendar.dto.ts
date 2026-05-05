import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateCalendarDto {
  @IsString()
  @IsOptional()
  name?: string | null;

  @IsString()
  @IsOptional()
  type?: string | null;

  @IsDateString()
  @IsOptional()
  start_time?: string | null;

  @IsDateString()
  @IsOptional()
  end_time?: string | null;

  @IsString()
  @IsOptional()
  status?: string | null;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  team_id?: number | null;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  assigner_id?: number | null;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  file_id?: number | null;
}

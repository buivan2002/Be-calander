import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

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
  @Min(0)
  @Max(100)
  @IsOptional()
  progress_percent?: number | null;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  estimate_hours?: number | null;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  actual_hours?: number | null;

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

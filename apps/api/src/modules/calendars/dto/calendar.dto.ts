import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CalendarDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsDateString()
  @IsNotEmpty()
  start_time: Date;

  @IsDateString()
  @IsNotEmpty()
  end_time: Date;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  progress_percent?: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  estimate_hours?: number | null;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  actual_hours?: number;

  @IsInt()
  @IsOptional()
  team_id?: number;

  @IsInt()
  @IsOptional()
  assigner_id?: number;
}

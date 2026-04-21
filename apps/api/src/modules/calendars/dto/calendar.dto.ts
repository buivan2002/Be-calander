import { IsNotEmpty, IsString, IsOptional, IsDateString, IsInt } from 'class-validator';

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


  @IsInt()
  @IsOptional()
  team_id?: number;

  @IsInt()
  @IsOptional()
  assigner_id?: number;
}

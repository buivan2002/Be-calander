import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class TeamMemberParamDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  teamId: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  userId: number;
}

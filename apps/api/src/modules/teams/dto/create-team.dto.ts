import { IsNotEmpty, IsString, IsArray, IsEmail, IsOptional } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsEmail({}, { each: true })
  @IsOptional()
  members?: string[];
}

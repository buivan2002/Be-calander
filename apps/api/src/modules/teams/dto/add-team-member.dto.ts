import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AddTeamMemberDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

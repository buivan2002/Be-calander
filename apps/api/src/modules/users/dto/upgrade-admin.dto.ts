import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpgradeAdminDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

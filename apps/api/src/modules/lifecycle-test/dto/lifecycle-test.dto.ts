import { IsString, IsEmail, IsInt, Min } from 'class-validator';

export class LifecycleTestDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  @Min(18)
  age: number;
}

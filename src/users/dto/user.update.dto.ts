import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UserUpdateDto {
  @IsEmail()
  email: string;
  
  @MinLength(8, {
    message: "Password is too short. Minimal length is characters"
  })
  @IsOptional()
  password: string;
  
  @IsOptional()
  @IsString()
  avatarPath: string;
  
  @IsOptional()
  name: string;
}

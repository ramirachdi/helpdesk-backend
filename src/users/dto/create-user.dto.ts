import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional() // Makes the field optional
  name?: string;

  @IsString()
  @IsOptional() // Makes the field optional
  role?: string = 'user'; // Default role if not provided
}

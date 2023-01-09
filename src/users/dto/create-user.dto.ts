import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
  @MinLength(3)
  @IsNotEmpty()
  username: string;
  @MinLength(8)
  @IsNotEmpty()
  password: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  role? : 'Employee' | 'Admin' | 'ProjectManager';
}

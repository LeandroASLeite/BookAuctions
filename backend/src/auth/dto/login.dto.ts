import { IsEmail, IsStrongPassword, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  @IsStrongPassword({ minUppercase: 1, minSymbols: 1, minNumbers: 3 })
  password: string;
}

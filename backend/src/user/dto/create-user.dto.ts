import { IsEmail, IsStrongPassword, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  name: string;

  @MinLength(8)
  @IsStrongPassword({ minUppercase: 1, minSymbols: 1, minNumbers: 3 })
  password: string;
}

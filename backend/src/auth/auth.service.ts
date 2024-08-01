import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { compare } from 'src/services/encrypt.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!(await compare(loginDto.password, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, email: user.email };
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: `Bearer ${await this.jwtService.signAsync(payload)}`,
    };
  }
}

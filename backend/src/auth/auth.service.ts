import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if( !isPasswordValid ) throw new UnauthorizedException('Invalid password.')
    
    const { password, ...result } = user;
    return result;
  }

  async login(reqUser: any) {
    const payload = { username: reqUser.username, id: reqUser.id };
    const { password, ...user} = await this.usersService.findOne(reqUser.username);
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}

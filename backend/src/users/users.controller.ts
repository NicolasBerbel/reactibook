import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile( @Request() req ) {
    const { password, ...user } = await this.usersService.findOne( req.user.username); 
    return user;
  }
}

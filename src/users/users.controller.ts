import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile( @Request() req ) {
    return `Hello ${req.user.username}!`;
  }
}

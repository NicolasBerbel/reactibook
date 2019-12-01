import { Request as ExpressRequest } from 'express';
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';

const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

@Controller('users')
export class UsersController {

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile( @Request() req ) {
    return `Hello ${req.user.username}!`;
  }
}

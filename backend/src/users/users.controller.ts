import { Controller, Get, Put, Body, Query, Param, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { MediaService } from '../media';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
    private readonly mediaService: MediaService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe( @Request() req ) {
    const { password, ...user } = await this.usersService.findOne( req.user.username); 
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('avatar')
  async updateAvatar( @Request() req, @Body('avatar') avatarId : string ) {
    const avatarMedia = await this.mediaService.getMedia( avatarId );
    if( !avatarMedia ) throw new NotFoundException('Avatar media not found!');
    const updatedUser = await this.usersService.updateUser( req.user.id, { avatar: avatarMedia.url } );
    return updatedUser;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUser( @Param('id') id : string | string[] ) {
    return this.usersService.find(id, 'id');
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUsers( @Query('id') id : string | string[] ) {
    return this.usersService.find(id, 'id');
  }
}

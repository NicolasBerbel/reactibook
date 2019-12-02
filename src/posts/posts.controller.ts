import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  BadRequestException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { UsersService } from '../users';

@Controller('posts')
export class PostsController {

  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}
  
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getMyPosts( @Request() req ) {
    return this.postsService.getPosts( req.user.id );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('friends')
  async getFriendsPosts( @Request() req ) {
    const { friends } = await this.usersService.findOne( req.user.username );
    return this.postsService.getPosts( friends );
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost( @Request() req, @Body('content') content, @Body('privacy') privacy = 'friends' ) {
    if( !content ) return new BadRequestException('The post\'s "content" property is mandatory.')

    return this.postsService.createPost({
      author: req.user.id,
      content,
      privacy
    })
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updatePost( @Request() req, @Param('id') id, @Body() payload ) {
    return this.postsService.updatePost(id, req.user.id, payload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deletePost( @Request() req, @Param('id') id ) {
    return this.postsService.deletePost(id, req.user.id);
  }
}

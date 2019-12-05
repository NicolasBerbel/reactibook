import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFiles
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  
  constructor(
    private readonly mediaService: MediaService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(@UploadedFiles() files, @Request() req) {
    const newMedias = await this.mediaService.uploadMultiple(req.user.id, files);
    return newMedias;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getMedia(@Param('id') mediaId) {
    const newMedia = await this.mediaService.getMedia(mediaId);
    return newMedia;
  }
}

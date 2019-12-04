import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth';
import { PostsModule } from '../posts';
import { MediaModule } from '../media';

@Module({
  imports: [AuthModule, PostsModule, MediaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

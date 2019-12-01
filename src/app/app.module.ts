import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth';
import { PostsModule } from '../posts';

@Module({
  imports: [AuthModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { FirebaseModule } from '../firebase';
import { UsersModule } from '../users';

@Module({
  imports: [FirebaseModule, UsersModule],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}

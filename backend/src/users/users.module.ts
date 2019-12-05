import { Module } from '@nestjs/common';
import { FirebaseModule } from '../firebase';
import { MediaModule } from '../media';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [FirebaseModule, MediaModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { FirebaseModule } from '../firebase';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [FirebaseModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

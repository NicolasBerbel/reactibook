import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { FirebaseModule } from '../firebase';

@Module({
  imports: [FirebaseModule],
  providers: [MediaService],
  controllers: [MediaController]
})
export class MediaModule {}

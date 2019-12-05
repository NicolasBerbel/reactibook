import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException
} from '@nestjs/common';
import * as sharp from 'sharp';
import { FirebaseService } from '../firebase';

export type Media = any;

@Injectable()
export class MediaService {
  bucket = this.firebaseService.bucket;
  constructor(private readonly firebaseService : FirebaseService) {}

  async uploadMultiple( owner, files ) {
    return Promise.all(files.map( file => this.uploadSingle(owner, file)));
  }

  async uploadSingle( owner, file ) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      throw new BadRequestException('Only image files are allowed!');
    }

    let buffer;
    try {
      buffer = await sharp(file.buffer)
        .resize({
          width: 800,
        })
        .toBuffer()
    } catch( e ) {
      console.error(e);
      throw new BadRequestException('Only image files are allowed!');
    }

    const newMediaId = this.firebaseService.media.push().key;
    const bucketUrl = await this.uploadToBucket( newMediaId, file, buffer );
    const timestamp = new Date().getTime();
    const newMedias = {
      [newMediaId]: {
        updatedAt: timestamp,
        createdAt: timestamp,
        owner,
        url: bucketUrl,
      },
    };

    try {
      this.firebaseService.media.update( newMedias );

      return {
        id: newMediaId,
        ...newMedias[newMediaId]
      };
    } catch (error) {
      throw new InternalServerErrorException('Internal server error, try again in a few moments')
    }
  }

  uploadToBucket( id, file, buffer ) {
    const { originalname, mimetype, size } = file;
    return new Promise((resolve, reject) => {
      if (!file) reject('No image file');

      const fileName = `${id}_${originalname}`;
      const bucketFile = this.bucket.file(fileName);
      const stream = bucketFile.createWriteStream({
        contentType: mimetype,
        public: true,
      });
  
      stream.on('error', (error) => {
        console.log( error );
        reject('Something is wrong! Unable to upload at the moment.')
      });
      stream.on('finish', () => resolve(bucketFile.metadata.mediaLink));
      stream.end(buffer);
    });
  }

  async getMedia(id: string) : Promise<Media | undefined> {
    return new Promise((resolve, reject) => {
      const query = this.firebaseService.media.orderByKey().equalTo(id);

      query.once('value', snapshot => {
        if( !snapshot.exists() ) return reject(new NotFoundException(`Media "${id}" does not exist.`));

        snapshot.forEach( snap => {
          resolve({
            id: snap.key,
            ...snap.val()
          })
        })
      });
    });
  }

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../firebase';

export type User = any;

@Injectable()
export class UsersService {
  
  constructor(private readonly firebaseService : FirebaseService) {}

  async findOne(username: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      const query = this.firebaseService.users.orderByChild('username').equalTo(username);
      
      query.once('value', snapshot => {
        if( !snapshot.exists() ) return reject(new NotFoundException(`User "${username}" is not registered.`));

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

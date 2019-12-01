import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

export type User = any;

@Injectable()
export class UsersService {
  
  private readonly users: User[];

  constructor(private readonly firebaseService : FirebaseService) {}

  async findOne(username: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      this.firebaseService.users.orderByChild('username').equalTo(username)
        .once("value", (snapshot) => {
          const val = snapshot.val();

          if( !val || !val.length ) {
            return reject();
          }

          const user = val.filter(v => !!v)[0];
          resolve(user);
        });
    });
  }
}

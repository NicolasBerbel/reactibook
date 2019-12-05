import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { FirebaseService } from '../firebase';

export type User = any;

@Injectable()
export class UsersService {
  cache : any = {};

  constructor(private readonly firebaseService : FirebaseService) {};

  fromCache(val : any, key : User['id']) : User | undefined {
    return ( key === 'id') ?
      this.cache[val] :
      Object.values(this.cache).find( (user : User) => user[key] === val);
  }

  async findOne(fieldValue: string, field: string = 'username'): Promise<User | undefined> {
    return this.fromCache(fieldValue, field) || new Promise((resolve, reject) => {
      let query;
      if( field === 'id' ) {
        query = this.firebaseService.users.orderByKey().equalTo(fieldValue);
      } else {
        query = this.firebaseService.users.orderByChild(field).equalTo(fieldValue);
      }
      
      query.once('value', snapshot => {
        if( !snapshot.exists() ) return reject(new NotFoundException(`User "${fieldValue}" is not registered.`));

        snapshot.forEach( snap => {
          const user = {
            id: snap.key,
            ...snap.val()
          };

          this.cache[user.id] = user;
          
          resolve(user)
        })
      });
    });
  }

  async find( values : string | string[], field : string ) : Promise<User | User[] | null> {
    const queryValues = typeof values === 'string' ? [values] : values;

    const users = await Promise.all(
      queryValues.map( async (value) => {
        const { password, ...user } = await this.findOne( value, field ); 
        return user;
      })
    );
    if( !users.length ) return null;

    return users.length === 1 ? users[0] : users;
  }

  async updateUser( userId, payload ) {
    const user = await this.findOne(userId, 'id');
    const updatedUsers = {
      [user.id] : {
        ...user,
        ...payload,
      }
    }
    
    try {
      this.firebaseService.users.update( updatedUsers );

      const updatedUser = {
        id: user.id,
        ...updatedUsers[user.id]
      }

      this.cache[user.id] = updatedUser;

      const { password, ...returnUser } = updatedUser; 
      return returnUser;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error, try again in a few moments')
    }
  }

}

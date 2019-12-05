import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { FirebaseService } from '../firebase';

type Post = any;

@Injectable()
export class PostsService {
  constructor(
    private readonly firebaseService : FirebaseService
  ) {}

  async byId( postId ) : Promise<Post> {
    const query = this.firebaseService.posts.orderByKey().equalTo(postId);

    return new Promise((resolve, reject) => {
      query.once('value', snapshot => {
        if( !snapshot.exists() ) return reject(new BadRequestException(`Invalid post id "${postId}".`))
        snapshot.forEach(snap => {
          const post = snap.val();
          resolve({
            id: snap.key,
            ...post
          })
        })
      })
    })
  }

  async getPosts( userIds ) {
    let users = typeof userIds === 'string' ? [userIds] : userIds;

    const usersPosts : Array<any[]> = await Promise.all(
      users.map( userId => this.getByUserId( userId ))
    );

    return usersPosts.reduce( (acc : any[], posts : any[]) => ([...acc, ...posts]), [])
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }

  async getByUserId( userId ) {
    return new Promise((resolve) => {
      const query = this.firebaseService.posts.orderByChild('author').equalTo(userId);
      const posts = [];
      
      query.once('value', snapshot => {
        snapshot.forEach(snap => {
          const post = snap.val();
          posts.push({
            id: snap.key,
            ...post
          })
        })

        posts.reverse();
        resolve( posts );
      })
    });
  }

  async createPost( payload ) {
    const timestamp = new Date().getTime();
    const newPostId = this.firebaseService.posts.push().key;

    const newPosts = {
      [newPostId]: {
        updatedAt: timestamp,
        createdAt: timestamp,
        ...payload,
      },
    };

    try {
      this.firebaseService.posts.update( newPosts );

      return {
        id: newPostId,
        ...newPosts[newPostId]
      };
    } catch (error) {
      throw new InternalServerErrorException('Internal server error, try again in a few moments')
    }
  }

  async updatePost( postId, userId, payload ) {
    const post = await this.byId( postId );
    if( post.author !== userId ) throw new BadRequestException(`Invalid post id: "${postId}"`)
    
    const updatedPosts = {
      [post.id] : {
        ...post,
        ...payload,
        updatedAt: new Date().getTime(),
      }
    }
    
    try {
      this.firebaseService.posts.update( updatedPosts );

      return {
        id: post.id,
        ...updatedPosts[post.id]
      };
    } catch (error) {
      throw new InternalServerErrorException('Internal server error, try again in a few moments')
    }
  }

  async deletePost( postId, userId ) {
    const post = await this.byId( postId );
    if( post.author !== userId ) throw new BadRequestException(`Invalid post id: "${postId}"`)
    
    const updatedPosts = {
      [post.id] : null
    }
    
    try {
      this.firebaseService.posts.update( updatedPosts );

      return post.id;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error, try again in a few moments')
    }
  }
}

import { IMedia } from '../media/types';

/**
 * Action types
 */
export enum PostsActions {
  FETCH_REQUEST = '@posts/FETCH_REQUEST',
  FETCH_SUCCESS = '@posts/FETCH_SUCCESS',
  FETCH_FAILURE = '@posts/FETCH_FAILURE',
  CREATE_REQUEST = '@posts/CREATE_REQUEST',
  CREATE_SUCCESS = '@posts/CREATE_SUCCESS',
  CREATE_FAILURE = '@posts/CREATE_FAILURE',
  DELETE_REQUEST = '@posts/DELETE_REQUEST',
  DELETE_SUCCESS = '@posts/DELETE_SUCCESS',
  DELETE_FAILURE = '@posts/DELETE_FAILURE',
  UPDATE_REQUEST = '@posts/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@posts/UPDATE_SUCCESS',
  UPDATE_FAILURE = '@posts/UPDATE_FAILURE',
}

/**
 * Data types
 */
export interface IPost {
  id: string;
  author: string;
  privacy: 'friends' | 'public';
  createdAt: number;
  updatedAt: number;
  content: string;
  medias?: IMedia['url'][]
}

/**
 * State type
 */
export interface PostsState {
  readonly data: IPost[]
  readonly loading: boolean
  readonly error: boolean
}

export interface CreatePostPayload {
  content: IPost['content'];
  privacy: IPost['privacy'];
  medias?: IPost['medias'];
}

export interface UpdatePostPayload {
  id: IPost['id'];
  content: IPost['content'];
  privacy: IPost['privacy'];
}
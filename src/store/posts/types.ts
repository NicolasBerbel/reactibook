/**
 * Action types
 */
export enum PostsActions {
  FETCH_REQUEST = '@posts/FETCH_REQUEST',
  FETCH_SUCCESS = '@posts/FETCH_SUCCESS',
  FETCH_FAILURE = '@posts/FETCH_FAILURE',
}

/**
 * Data types
 */
export interface IPost {
  id: string;
  author: string;
  privacy: string;
  createdAt: number;
  updatedAt: number;
  content: string;
}

/**
 * State type
 */
export interface PostsState {
  readonly data: IPost[]
  readonly loading: boolean
  readonly error: boolean
}
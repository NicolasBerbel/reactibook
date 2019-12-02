import { createAsyncAction } from 'typesafe-actions';
import { PostsActions, IPost } from './types';

export const fetchPosts = createAsyncAction(
  PostsActions.FETCH_REQUEST,
  PostsActions.FETCH_SUCCESS,
  PostsActions.FETCH_FAILURE,
)<string, IPost[], Error>();

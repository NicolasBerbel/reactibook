import { createAsyncAction } from 'typesafe-actions';
import { CreatePostPayload, UpdatePostPayload, PostsActions, IPost } from './types';

export const fetchPosts = createAsyncAction(
  PostsActions.FETCH_REQUEST,
  PostsActions.FETCH_SUCCESS,
  PostsActions.FETCH_FAILURE,
)<string, IPost[], Error>();

export const createPost = createAsyncAction(
  PostsActions.CREATE_REQUEST,
  PostsActions.CREATE_SUCCESS,
  PostsActions.CREATE_FAILURE,
)<CreatePostPayload, IPost, Error>();

export const deletePost = createAsyncAction(
  PostsActions.DELETE_REQUEST,
  PostsActions.DELETE_SUCCESS,
  PostsActions.DELETE_FAILURE,
)<IPost['id'], IPost['id'], Error>();

export const updatePost = createAsyncAction(
  PostsActions.UPDATE_REQUEST,
  PostsActions.UPDATE_SUCCESS,
  PostsActions.UPDATE_FAILURE,
)<UpdatePostPayload, IPost, Error>();
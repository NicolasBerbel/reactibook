import { createReducer, ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { PostsState } from './types';

const INITIAL_STATE: PostsState = {
  data: [],
  error: false,
  loading: false,
};


const reducer = createReducer<PostsState, ActionType<typeof actions>>(INITIAL_STATE)
  .handleAction(actions.fetchPosts.request, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.fetchPosts.success, (state, { payload : data }) => ({
    ...state,
    loading: false,
    error: false,
    data,
  }))
  .handleAction(actions.fetchPosts.failure, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))
  .handleAction(actions.createPost.request, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.createPost.success, (state, { payload : newPost }) => ({
    ...state,
    loading: false,
    error: false,
    data: [
      ...state.data,
      newPost
    ].sort( (a, b) => b.updatedAt - a.updatedAt),
  }))
  .handleAction(actions.createPost.failure, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))
  .handleAction(actions.deletePost.request, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.deletePost.success, (state, { payload }) => ({
    ...state,
    loading: false,
    error: false,
    data: state.data.filter(post => post.id !== payload)
  }))
  .handleAction(actions.deletePost.failure, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))
  .handleAction(actions.updatePost.request, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.updatePost.success, (state, { payload : updatedPost }) => ({
    ...state,
    loading: false,
    error: false,
    data: state.data.map(post => {
      if( post.id === updatedPost.id ) return updatedPost;
      return post;
    })
  }))
  .handleAction(actions.updatePost.failure, (state) => ({
    ...state,
    loading: false,
    error: true,
  }));

export default reducer;
export * from './actions';
export * from './sagas';
export * from './types';
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
  }));

export default reducer;
export * from './actions';
export * from './sagas';
export * from './types';
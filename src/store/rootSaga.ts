import { all, takeLatest } from 'redux-saga/effects';

import {
  fetchPostsSaga,
  createPostSaga,
  deletePostSaga,
  updatePostSaga,
  PostsActions
} from './posts';

export default function* rootSaga() {
  return yield all([
    takeLatest(PostsActions.FETCH_REQUEST, fetchPostsSaga),
    takeLatest(PostsActions.CREATE_REQUEST, createPostSaga),
    takeLatest(PostsActions.DELETE_REQUEST, deletePostSaga),
    takeLatest(PostsActions.UPDATE_REQUEST, updatePostSaga),
  ]);
}

import { all, takeLatest } from 'redux-saga/effects';
import { loginSaga, logoutSaga, AuthActions } from './auth';
import {
  fetchPostsSaga,
  createPostSaga,
  deletePostSaga,
  updatePostSaga,
  PostsActions
} from './posts';

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthActions.LOGIN_REQUEST, loginSaga),
    takeLatest(AuthActions.LOGOUT_REQUEST, logoutSaga),
    takeLatest(PostsActions.FETCH_REQUEST, fetchPostsSaga),
    takeLatest(PostsActions.CREATE_REQUEST, createPostSaga),
    takeLatest(PostsActions.DELETE_REQUEST, deletePostSaga),
    takeLatest(PostsActions.UPDATE_REQUEST, updatePostSaga),
  ]);
}

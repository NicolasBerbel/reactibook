import { all, takeLatest } from 'redux-saga/effects';
import { uploadMediaSaga, MediaActions } from './media';
import {
  getAuthUserSaga,
  loginSaga,
  logoutSaga,
  AuthActions
} from './auth';
import {
  fetchPostsSaga,
  createPostSaga,
  deletePostSaga,
  updatePostSaga,
  PostsActions
} from './posts';

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthActions.GET_AUTH_USER_REQUEST, getAuthUserSaga),
    takeLatest(AuthActions.LOGIN_REQUEST, loginSaga),
    takeLatest(AuthActions.LOGOUT_REQUEST, logoutSaga),
    takeLatest(PostsActions.FETCH_REQUEST, fetchPostsSaga),
    takeLatest(PostsActions.CREATE_REQUEST, createPostSaga),
    takeLatest(PostsActions.DELETE_REQUEST, deletePostSaga),
    takeLatest(PostsActions.UPDATE_REQUEST, updatePostSaga),
    takeLatest(MediaActions.UPLOAD_REQUEST, uploadMediaSaga),
  ]);
}

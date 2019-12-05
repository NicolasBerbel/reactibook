import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import { fetchPosts, createPost, deletePost, updatePost } from './actions';

export function* fetchPostsSaga() {
  try {
    const { data } = yield call(api.get, 'posts');

    yield put(fetchPosts.success(data));
  } catch (err) {
    yield put(fetchPosts.failure(err));
  }
}

export function* createPostSaga(action: ReturnType<typeof createPost.request>) {
  try {
    const { data } = yield call(api.post, 'posts', action.payload);

    yield put(createPost.success(data));
  } catch (err) {
    yield put(createPost.failure(err));
  }
}

export function* deletePostSaga(action: ReturnType<typeof deletePost.request>) {
  try {
    const { data } = yield call(api.delete, `posts/${action.payload}`);

    yield put(deletePost.success(data));
  } catch (err) {
    yield put(deletePost.failure(err));
  }
}

export function* updatePostSaga(action: ReturnType<typeof updatePost.request>) {
  try {
    const { id, ...payload } = action.payload;
    const { data } = yield call(api.put, `posts/${id}`, payload);

    yield put(updatePost.success(data));
  } catch (err) {
    yield put(updatePost.failure(err));
  }
}
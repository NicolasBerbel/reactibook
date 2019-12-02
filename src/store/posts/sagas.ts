import { call, put } from 'redux-saga/effects';
import api from '../../services/api';

import { fetchPosts } from './actions';

export function* loadSaga() {
  try {
    const { data } = yield call(api.get, 'posts');

    yield put(fetchPosts.success(data));
  } catch (err) {
    yield put(fetchPosts.failure(err));
  }
}
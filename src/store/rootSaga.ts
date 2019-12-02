import { all, takeLatest } from 'redux-saga/effects';

import { loadSaga, PostsActions } from './posts';

export default function* rootSaga() {
  return yield all([
    takeLatest(PostsActions.FETCH_REQUEST, loadSaga),
  ]);
}

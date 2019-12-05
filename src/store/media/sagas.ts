import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import { uploadMedia } from './actions';

export function* uploadMediaSaga(action: ReturnType<typeof uploadMedia.request>) {
  try {
    const formData = new FormData();
    for (let i = 0; i < action.payload.files.length; i++) {
      const file = action.payload.files[i];
      formData.append('files', file)
    }

    const { data } = yield call(api.post, 'media/upload', formData);

    yield put(uploadMedia.success(data));
  } catch (err) {
    yield put(uploadMedia.failure(err));
  }
}

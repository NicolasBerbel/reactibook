import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import { login, logout } from './actions';

export function* loginSaga( action : ReturnType<typeof login.request>) {
  try {
    const { data } = yield call(api.post, 'auth/login', action.payload);

    localStorage.setItem('token', data.access_token);
    yield put(login.success(data.access_token));
  } catch (err) {
    yield put(login.failure(err));
  }
}

export function* logoutSaga( action : ReturnType<typeof logout.request>) {
  localStorage.removeItem('token');
  yield put(logout.success());
}

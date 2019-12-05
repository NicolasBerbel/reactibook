import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import { getAuthUser, login, logout } from './actions';

export function* getAuthUserSaga( action : ReturnType<typeof getAuthUser.request>) {
  try {
    const { data } = yield call(api.get, 'users/me');

    localStorage.setItem('user', JSON.stringify(data));
    yield put(getAuthUser.success(data));
  } catch (err) {
    yield put(getAuthUser.failure(err));
  }
}

export function* loginSaga( action : ReturnType<typeof login.request>) {
  try {
    const { data } = yield call(api.post, 'auth/login', action.payload);

    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));
    yield put(login.success({ token: data.access_token, user: data.user }));
  } catch (err) {
    yield put(login.failure(err));
  }
}

export function* logoutSaga( action : ReturnType<typeof logout.request>) {
  localStorage.removeItem('token');
  yield put(logout.success());
}

import { createAsyncAction } from 'typesafe-actions';
import { LoginPayload, AuthActions } from './types';
import { AxiosError } from 'axios';

export const login = createAsyncAction(
  AuthActions.LOGIN_REQUEST,
  AuthActions.LOGIN_SUCCESS,
  AuthActions.LOGIN_FAILURE,
)<LoginPayload, string, AxiosError>();

export const logout = createAsyncAction(
  AuthActions.LOGOUT_REQUEST,
  AuthActions.LOGOUT_SUCCESS,
  AuthActions.LOGOUT_FAILURE,
)<void, void, Error>();

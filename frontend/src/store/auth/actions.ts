import { createAsyncAction } from 'typesafe-actions';
import { IUser, LoginPayload, AuthActions } from './types';
import { AxiosError } from 'axios';

export const getAuthUser = createAsyncAction(
  AuthActions.GET_AUTH_USER_REQUEST,
  AuthActions.GET_AUTH_USER_SUCCESS,
  AuthActions.GET_AUTH_USER_FAILURE,
)<null, IUser, AxiosError>();

export const login = createAsyncAction(
  AuthActions.LOGIN_REQUEST,
  AuthActions.LOGIN_SUCCESS,
  AuthActions.LOGIN_FAILURE,
)<LoginPayload, {token: string, user: IUser}, AxiosError>();

export const logout = createAsyncAction(
  AuthActions.LOGOUT_REQUEST,
  AuthActions.LOGOUT_SUCCESS,
  AuthActions.LOGOUT_FAILURE,
)<void, void, Error>();

/**
 * Action types
 */
export enum AuthActions {
  GET_AUTH_USER_REQUEST = '@auth/GET_AUTH_USER_REQUEST',
  GET_AUTH_USER_SUCCESS = '@auth/GET_AUTH_USER_SUCCESS',
  GET_AUTH_USER_FAILURE = '@auth/GET_AUTH_USER_FAILURE',
  LOGIN_REQUEST = '@auth/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@auth/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@auth/LOGIN_FAILURE',
  LOGOUT_REQUEST = '@auth/LOGOUT_REQUEST',
  LOGOUT_SUCCESS = '@auth/LOGOUT_SUCCESS',
  LOGOUT_FAILURE = '@auth/LOGOUT_FAILURE',
}

/**
 * Data types
 */
export interface IToken {
  id: string;
  username: string;
  iat: number;
  exp: number;
  raw: string;
}

export interface IUser {
  id: string;
  username: string;
  friends?: string[];
  avatar?: string;
}

/**
 * State type
 */
export interface AuthState {
  readonly token: IToken | null;
  readonly user: IUser | null;
  readonly loading: boolean;
  readonly error: boolean;
  readonly passwordError: string | null;
  readonly usernameError: string | null;
}

export interface LoginPayload {
  username: IToken['username'];
  password: string;
}

/**
 * Action types
 */
export enum AuthActions {
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

/**
 * State type
 */
export interface AuthState {
  readonly token: IToken | null;
  readonly loading: boolean;
  readonly error: boolean;
  readonly passwordError: string | null;
  readonly usernameError: string | null;
}

export interface LoginPayload {
  username: IToken['username'];
  password: string;
}

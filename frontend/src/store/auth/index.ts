import { createReducer, ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { AuthState } from './types';
import { validateToken, parseToken } from './helpers';

const INITIAL_STATE: AuthState = {
  token: validateToken(),
  error: false,
  passwordError: null,
  usernameError: null,
  loading: false,
};

const reducer = createReducer<AuthState, ActionType<typeof actions>>(INITIAL_STATE)
  .handleAction(actions.login.request, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.login.success, (state, { payload }) => {
    const token = parseToken(payload);

    return {
      ...state,
      loading: false,
      error: false,
      usernameError: null,
      passwordError: null,
      token,
    }
  })
  .handleAction(actions.login.failure, (state, { payload }) => {
    const baseErrorState = {
      ...state,
      loading: false,
      error: true,
    };
    if( !payload.response) return baseErrorState;

    return {
      ...baseErrorState,
      usernameError: payload.response.status === 404 ? payload.response.data.message : null,
      passwordError: payload.response.status === 401 ? payload.response.data.message : null,
    }
  })
  .handleAction(actions.logout.request, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.logout.success, (state) => ({
    ...state,
    token: null,
    loading: false,
  }));

export default reducer;
export * from './actions';
export * from './sagas';
export * from './types';
export * from './helpers';
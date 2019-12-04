import { createReducer, ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { MediaState } from './types';

const INITIAL_STATE: MediaState = {
  data: [],
  uploadedMedias: [],
  error: false,
  loading: false,
};

const reducer = createReducer<MediaState, ActionType<typeof actions>>(INITIAL_STATE)
  .handleAction(actions.uploadMedia.request, (state) => ({ ...state, loading: true }))
  .handleAction(actions.uploadMedia.success, (state, { payload : data }) => ({
    ...state,
    loading: false,
    error: false,
    uploadedMedias: [...state.uploadedMedias, ...data],
  }))
  .handleAction(actions.uploadMedia.failure, (state) => ({
    ...state,
    loading: false,
    error: true,
    uploadedMedias: [],
  }))
  .handleAction(actions.clearUploadedMedias, state => ({ ...state, uploadedMedias: [] }));

export default reducer;
export * from './actions';
export * from './sagas';
export * from './types';

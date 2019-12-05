import { createAsyncAction, createCustomAction } from 'typesafe-actions';
import { UploadMediaPayload, MediaActions, IMedia } from './types';

export const uploadMedia = createAsyncAction(
  MediaActions.UPLOAD_REQUEST,
  MediaActions.UPLOAD_SUCCESS,
  MediaActions.UPLOAD_FAILURE,
)<UploadMediaPayload, IMedia[], Error>();

export const clearUploadedMedias = createCustomAction(MediaActions.CLEAR_UPLOADED);

/**
 * Action types
 */
export enum MediaActions {
  UPLOAD_REQUEST = '@media/UPLOAD_REQUEST',
  UPLOAD_SUCCESS = '@media/UPLOAD_SUCCESS',
  UPLOAD_FAILURE = '@media/UPLOAD_FAILURE',
  CLEAR_UPLOADED = '@media/CLEAR_UPLOADED',
}

/**
 * Data types
 */
export interface IMedia {
  id: string;
  owner: string;
  url: string;
  updatedAt: number;
  createdAt: number;
}

/**
 * State type
 */
export interface MediaState {
  readonly uploadedMedias: IMedia[]
  readonly data: IMedia[]
  readonly loading: boolean
  readonly error: boolean
}

export interface UploadMediaPayload {
  files: FileList;
}

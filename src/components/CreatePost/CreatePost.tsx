import React, { useState, useEffect, FormEvent } from 'react';
import { createPost, uploadMedia, MediaState, clearUploadedMedias } from '../../store';

export interface CreatePostProps {
  uploadedMedias: MediaState['uploadedMedias'];
  createPost: typeof createPost.request;
  uploadMedia: typeof uploadMedia.request;
  clearUploadedMedias: typeof clearUploadedMedias;
}

export const CreatePost: React.FC<CreatePostProps> = props => {
  const { createPost, uploadMedia, uploadedMedias, clearUploadedMedias } = props;
  const [content, setContent] = useState('');
  const [privacy, setPrivacy] = useState('friends');
  const [files, setFiles] = useState<FileList | null>( null );
  const [medias, setMedias] = useState<string[] | null>( null );

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(
      files &&
      files.length !== uploadedMedias.length &&
      !window.confirm('The post media weren\'t uploaded, are you sure to post without the medias?')
    ) return;
 
    createPost({ content, privacy, medias: uploadedMedias.map( m => m.url ) });
    clearUploadedMedias();
    setContent('')
    setFiles(null);
  }

  useEffect(() => {
    if( !files ) return setMedias( null );
    setMedias([...files].map(file => URL.createObjectURL(file)));
  }, [files])

  const handleUpload = (e : React.MouseEvent) => {
    e.preventDefault();
    if( !files ) return;

    uploadMedia({ files })
  }

  const handleCancelUpload = (e : React.MouseEvent) => {
    e.preventDefault();
    setFiles(null)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={content} onChange={e => setContent(e.target.value)} />
        <select value={privacy} onChange={e => setPrivacy(e.target.value)}>
          <option value="friends">Friends</option>
          <option value="public">Public</option>
        </select>
        {!uploadedMedias.length && (
          <>
            {!files && (
              <div>
                <input type="file" multiple onChange={e => setFiles( e.target.files )} />
              </div>
            )}
            {medias && (
              <div>
                {medias.map( (image, i) => <img key={i} src={image} alt='Uploadable media' />)}
                <button onClick={handleCancelUpload}>Cancel</button>
                <button onClick={handleUpload}>Upload</button>
              </div>
            )}
          </>
        )}
        {!!uploadedMedias.length && (
            <div>
              {uploadedMedias.map( (image, i) => <img key={i} src={image.url} alt='Uploaded media' />)}
            </div>
        )}
        <button type="submit" disabled={!content}>Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;
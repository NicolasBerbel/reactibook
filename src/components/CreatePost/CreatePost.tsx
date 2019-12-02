import React, { useState, FormEvent } from 'react';
import api from '../../services/api';
import { IPost } from '../../store';

export interface CreatePostProps {
  onCreate: (p : IPost) => void;
}

export const CreatePost: React.FC<CreatePostProps> = props => {
  const [content, setContent] = useState('');
  const [privacy, setPrivacy] = useState('friends');

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await api.post('posts', {
      content,
      privacy
    });
    setContent('')

    props.onCreate( response.data )
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={content} onChange={e => setContent(e.target.value)} />
        <select value={privacy} onChange={e => setPrivacy(e.target.value)}>
          <option value="friends">Friends</option>
          <option value="public">Public</option>
        </select>
        <button type="submit" disabled={!content}>Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;
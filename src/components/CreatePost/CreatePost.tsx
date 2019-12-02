import React, { useState, FormEvent } from 'react';

export interface CreatePostProps {
  createPost: Function;
}

export const CreatePost: React.FC<CreatePostProps> = props => {
  const { createPost } = props;
  const [content, setContent] = useState('');
  const [privacy, setPrivacy] = useState('friends');

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPost({ content, privacy });
    setContent('')
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
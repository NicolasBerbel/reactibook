import React, { useState, FormEvent } from 'react';
import api from '../../services/api.service';

const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const [privacy, setPrivacy] = useState('friends');

  const handleSubmit = async (e : FormEvent) => {
    e.preventDefault();

    await api.post('posts', {
      content,
      privacy
    });
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
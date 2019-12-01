import React, { useState, FormEvent } from 'react';
import api from '../../services/api.service';

const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e : FormEvent) => {
    e.preventDefault();

    const { data } = await api.post('posts', {
      content,
    });
    setContent('')
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={content} onChange={e => setContent(e.target.value)} />
        <button type="submit" disabled={!content}>Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;
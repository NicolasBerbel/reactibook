import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { IPost } from '../../store';

export interface PostProps extends IPost {
  onDelete: (post: IPost['id']) => void;
  onUpdate: (post: IPost) => void;
}

export const Post: React.FC<PostProps> = props => {
  const [content, setContent] = useState(props.content);
  const [privacy, setPrivacy] = useState(props.privacy);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => setContent(props.content), [props.content]);
  useEffect(() => setPrivacy(props.privacy), [props.privacy]);

  const handleCancel = () => {
    setPrivacy(props.privacy);
    setContent(props.content);
    setIsEditing(false);
  }

  const handleSave = async () => {
    setIsEditing(false);
    const response = await api.put(`posts/${props.id}`, { content, privacy });
    props.onUpdate(response.data);
  }

  const handleDelete = async () => {
    if( !window.confirm(`Confirm delection of post: ${props.content}`) ) return;
    await api.delete(`posts/${props.id}`);
    props.onDelete(props.id);
  }

  return (
    <div>
      <h3>{props.author}</h3>
      <p>
        <strong>Created at: </strong>
        <time>{props.createdAt}</time>
      </p>
      <p>
        <strong>Edited at: </strong>
        <time>{props.updatedAt}</time>
      </p>
      <p>
        <strong>Visible to: </strong>
        {!isEditing && props.privacy }
        {isEditing && (
          <select value={privacy} onChange={e => setPrivacy(e.target.value)}>
            <option value="friends">Friends</option>
            <option value="public">Public</option>
          </select>
        )}
      </p>
      <div>
        {!isEditing && (
          <p>{props.content}</p>
        )}
        {isEditing && (
          <textarea value={content} onChange={e => setContent(e.target.value)} />
        )}
      </div>
      {!isEditing && (
        <>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
      {isEditing && (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel edition</button>
        </>
      )}
    </div>
  )
};

export default Post;

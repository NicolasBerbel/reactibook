import React, { useState, useEffect } from 'react';
import api from '../../services/api.service';

interface IPost {
  id: string;
  author: string;
  privacy: string;
  createdAt: number;
  updatedAt: number;
  content: string;
}

interface PostProps extends IPost {
  onEdit: Function;
  onDelete: Function;
}

const Post: React.FC<PostProps> = (props) => {
  return (
    <div>
      <h3>
        { props.author }
      </h3>
      <p>
        <strong>Created at:</strong>
        { props.createdAt }
      </p>
      <p>
        <strong>Edited at:</strong>
        { props.updatedAt }
      </p>
      <pre>
        { props.content }
      </pre>
      <button onClick={e => props.onEdit()}>Edit</button>
      <button onClick={e => props.onDelete()}>Delete</button>
    </div>
  )
};

interface PostListByPrivacyProps {
  posts: IPost[];
  privacy: string;
  onEdit: Function;
  onDelete: Function;
}

const PostListByPrivacy : React.FC<PostListByPrivacyProps> = props => {
  const posts = props.posts.filter(p => p.privacy === props.privacy);

  return (
    <div>
      {posts.map((post, i) =>
        <Post
          key={i}
          onEdit={() => props.onEdit(post.id)}
          onDelete={() => props.onDelete(post.id)}
          {...post}
        />
      )}
    </div>
  )
}

const Timeline: React.FC = () => {
  const [privacyFilter, setPrivacyFilter] = useState('friends');
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    api.get('posts').then( ({data}) => {
      console.log( data );
      setPosts(data)
    })
    return () => {};
  }, []);

  const handleEdit = ( id : string ) => {
    const post = posts.find( p => p.id === id);
    if( !post ) return;
  }

  const handleDelete = async ( id : string ) => {
    const post = posts.find( p => p.id === id);
    if( !post ) return;

    const confirmDelete = window.confirm(`Confirm delection of post: ${post.content}`)

    if( !confirmDelete ) return;

    await api.delete(`posts/${id}`);
    setPosts(posts.filter(p => p.id !== id));
  }

  return (
    <div>
      <div>
        <button disabled={privacyFilter === 'friends'} onClick={() => setPrivacyFilter('friends')}>Friends</button>
        <button disabled={privacyFilter === 'public'} onClick={() => setPrivacyFilter('public')}>Public</button>
      </div>
      <PostListByPrivacy posts={posts} privacy={privacyFilter} onEdit={handleEdit} onDelete={handleDelete}/>
    </div>
  );
}

export default Timeline;
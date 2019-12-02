import React, { useState, useEffect } from 'react';
import api from '../../services/api.service';
import { PostList, IPost } from '../Post';
import CreatePost from '../CreatePost';

const Timeline: React.FC = () => {
  const [privacyFilter, setPrivacyFilter] = useState('friends');
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    api.get('posts').then( ({data}) => setPosts(data) );
  }, []);

  return (
    <div>
      <CreatePost onCreate={post => setPosts( [...posts, post ].sort( (a, b) => b.updatedAt - a.updatedAt) )} />
      <div>
        <button disabled={privacyFilter === 'friends'} onClick={() => setPrivacyFilter('friends')}>Friends</button>
        <button disabled={privacyFilter === 'public'} onClick={() => setPrivacyFilter('public')}>Public</button>
      </div>
      <PostList
        posts={posts.filter( p => p.privacy === privacyFilter)}
        onDelete={deletedId => setPosts( posts.filter(post => post.id !== deletedId))}
        onUpdate={updatedPost => setPosts( posts.map(post => {
          if( post.id === updatedPost.id ) return updatedPost;
          return post;
        }))}
      />
    </div>
  );
}

export default Timeline;
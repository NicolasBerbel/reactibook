import React, { useState, useEffect } from 'react';
import { IPost } from '../../store';
import { PostList } from '../Post';
import CreatePost from '../CreatePost';

interface TimelineProps {
  loading: boolean;
  error: boolean;
  posts: IPost[];
  fetchPosts: Function;
}

const Timeline: React.FC<TimelineProps> = props => {
  const { posts, fetchPosts } = props;
  const [privacyFilter, setPrivacyFilter] = useState('friends');
  // const [posts, setPosts] = useState<IPost[]>([]);
  const setPosts = (...a : any[]) => {};

  useEffect(() => fetchPosts(), [fetchPosts])

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
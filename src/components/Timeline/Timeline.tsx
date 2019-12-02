import React, { useState, useEffect } from 'react';
import { IPost } from '../../store';
import { PostList } from '../Post';
import CreatePost from '../CreatePost/CreatePostContainer';

interface TimelineProps {
  loading: boolean;
  error: boolean;
  posts: IPost[];
  fetchPosts: Function;
}

const Timeline: React.FC<TimelineProps> = props => {
  const { posts, fetchPosts } = props;
  const [privacyFilter, setPrivacyFilter] = useState('friends');

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts])

  return (
    <div>
      <CreatePost />
      <div>
        <button disabled={privacyFilter === 'friends'} onClick={() => setPrivacyFilter('friends')}>Friends</button>
        <button disabled={privacyFilter === 'public'} onClick={() => setPrivacyFilter('public')}>Public</button>
      </div>
      <PostList posts={posts.filter( p => p.privacy === privacyFilter)} />
    </div>
  );
}

export default Timeline;
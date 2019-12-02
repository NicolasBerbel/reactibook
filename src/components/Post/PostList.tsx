import React from 'react';
import Post from './PostContainer';
import { IPost } from '../../store';

export interface PostListProps {
  posts: IPost[];
}

export const PostList : React.FC<PostListProps> = props => {
  return (
    <div>
      {!!props.posts.length && props.posts.map((post : IPost, i) => (
        <Post
          key={i}
          {...post}
        />
      ))}
      {!props.posts.length && (
        <p>No posts found.</p>
      )}
    </div>
  )
};

export default PostList;
import React from 'react';
import Post, { IPost } from './Post';

export interface PostListProps {
  posts: IPost[];
  onDelete: (p:IPost['id']) => void;
  onUpdate: (p:IPost) => void;
}

export const PostList : React.FC<PostListProps> = props => {
  return (
    <div>
      {!!props.posts.length && props.posts.map((post : IPost, i) => (
        <Post
          key={i}
          onUpdate={props.onUpdate}
          onDelete={props.onDelete}
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
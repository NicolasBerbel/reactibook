import React from 'react';
import Post from './PostContainer';
import { IPost } from '../../store';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export interface PostListProps {
  className?: string;
  posts: IPost[];
}

export const PostList : React.FC<PostListProps> = props => {
  return (
    <Grid container spacing={2} className={props.className}>
      {!!props.posts.length && props.posts.map((post : IPost, i) => (
        <Grid key={post.id} item xs={12}>
          <Post {...post} />
        </Grid>
      ))}
      {!props.posts.length && (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography>No posts found.</Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  )
};

export default PostList;
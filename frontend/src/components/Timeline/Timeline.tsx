import React, { useState, useEffect } from 'react';
import { IPost } from '../../store';
import { PostList } from '../Post';
import CreatePost from '../CreatePost/CreatePostContainer';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import FriendsIcon from '@material-ui/icons/Group';
import PublicIcon from '@material-ui/icons/Public';

const useStyles = makeStyles( theme => ({
  bar: {
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    top: 40 + theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      top: 60 + theme.spacing(2),
    },
  },
  postList: {
    marginTop: theme.spacing(1)
  }
}))

interface TimelineProps {
  loading: boolean;
  error: boolean;
  posts: IPost[];
  fetchPosts: Function;
}

const Timeline: React.FC<TimelineProps> = props => {
  const { posts, fetchPosts } = props;
  const classes = useStyles();
  const [privacyFilter, setPrivacyFilter] = useState('friends');

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CreatePost />
      </Grid>
      <Grid item xs={12}>
        <AppBar position="sticky" color="inherit" elevation={2} className={classes.bar}>
          <Tabs
            value={privacyFilter}
            onChange={(e, val) => setPrivacyFilter(val)}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
          >
            <Tab value="friends" label="Friends" icon={<FriendsIcon />} />
            <Tab value="public" label="Public" icon={<PublicIcon />} />
          </Tabs>
        </AppBar>
        <PostList className={classes.postList} posts={posts.filter( p => p.privacy === privacyFilter)} />
      </Grid>
    </Grid>
  );
}

export default Timeline;
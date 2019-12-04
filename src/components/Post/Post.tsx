import React, { useState, useEffect } from 'react';
import { IPost } from '../../store';
import PostActions from './PostActions';
import PostMedia from './PostMedia';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { orange, green } from '@material-ui/core/colors';
import PrivacySelect from '../PrivacySelect';
import FriendsIcon from '@material-ui/icons/Group';
import PublicIcon from '@material-ui/icons/Public';
import ConfirmDeletion from './ConfirmDeletion';

const privacySettings = {
  friends: {
    Icon: FriendsIcon,
    label: 'Friends',
  },
  public: {
    Icon: PublicIcon,
    label: 'Public',
  },
};

const WarningButton = withStyles(theme => ({
  root: {
    color: '#fff',
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
  },
}))(Button);

const SuccessButton = withStyles(theme => ({
  root: {
    color: '#fff',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

export interface PostProps extends IPost {
  updatePost: Function;
  deletePost: Function;
}

export const Post: React.FC<PostProps> = props => {
  const { deletePost, updatePost } = props;
  const [deleteConfirmationOpen, setDeleteConfirmatonOpen] = useState(false);
  const [content, setContent] = useState(props.content);
  const [privacy, setPrivacy] = useState(props.privacy);
  const [isEditing, setIsEditing] = useState(false);
  const isEdited = props.createdAt !== props.updatedAt;
  const shownDate = isEdited ? props.updatedAt : props.createdAt;
  const momentDate = moment(shownDate);
  const PrivacyIcon = privacySettings[props.privacy].Icon;

  useEffect(() => setContent(props.content), [props.content]);
  useEffect(() => setPrivacy(props.privacy), [props.privacy]);

  const handleCancel = () => {
    setPrivacy(props.privacy);
    setContent(props.content);
    setIsEditing(false);
  }

  const handleSave = () => {
    setIsEditing(false);
    updatePost({ id: props.id, content, privacy });
  }

  const handleDelete = () => {
    deletePost( props.id );
  }


  return (
    <>
      <Card elevation={isEditing ? 5 : 2}>
        <CardHeader
          action={<PostActions onEdit={() => setIsEditing(true)} onDelete={() => setDeleteConfirmatonOpen(true)} />}
          subheader={(
            <>
              <time title={momentDate.format('LLLL')}>
                <strong>{isEdited ? 'Edited' : 'Created'} </strong>
                {momentDate.from()}
              </time>
              <Grid container alignItems="center" spacing={2}>
                {!isEditing && (
                  <>
                    <Grid item>
                      <Typography><strong>Visible to: </strong></Typography>
                    </Grid>
                    <Grid item>
                      <Grid container alignItems="center" spacing={0}>
                        <PrivacyIcon fontSize="small" style={{marginRight: 8}} />
                        {privacySettings[props.privacy].label}
                      </Grid>
                    </Grid>
                  </>
                )}
                {isEditing && (
                  <>
                    <Grid item>
                      <Typography><strong>Change privacy: </strong></Typography>
                    </Grid>
                    <Grid item>
                      <PrivacySelect privacy={privacy} onChange={p => setPrivacy(p)} />
                    </Grid>
                  </>
                )}
              </Grid>
            </>
          )}
        />
        {props.medias && props.medias.length && <PostMedia medias={props.medias} />}
        <CardContent>
          {!isEditing && (
            <Typography component="div">
              <ReactMarkdown source={props.content} />
            </Typography>
          )}
          {isEditing && (
            <TextField
              variant="filled"
              fullWidth
              multiline
              rowsMax="15"
              value={content}
              margin="normal"
              onChange={e => setContent(e.target.value)}
            />
          )}
        </CardContent>
        <CardActions>
          {isEditing && (
            <>
              <SuccessButton startIcon={<SaveIcon />} size="small" color="primary" onClick={handleSave}>Save</SuccessButton>
              <WarningButton startIcon={<CancelIcon />} size="small" onClick={handleCancel}>Cancel edition</WarningButton>
            </>
          )}
        </CardActions>
      </Card>
      <ConfirmDeletion open={deleteConfirmationOpen} onClose={() => setDeleteConfirmatonOpen(false)} onConfirm={() => handleDelete()}>
        <Typography component="div">
          <ReactMarkdown source={props.content} />
        </Typography>
      </ConfirmDeletion>
    </>
  )
};

export default Post;

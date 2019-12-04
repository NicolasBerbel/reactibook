import React, { useState, FormEvent } from 'react';
import { createPost, uploadMedia, MediaState, clearUploadedMedias } from '../../store';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import ImageIcon from '@material-ui/icons/Image';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import FriendsIcon from '@material-ui/icons/Group';
import PublicIcon from '@material-ui/icons/Public';

const useStyles = makeStyles( theme => ({
  root: {
    padding: theme.spacing(3)
  },
  selectIcon: {
    marginRight: theme.spacing(1)
  },
  
  input: {
    '& .MuiInput-root': {
      marginBottom: 16,
    },
    '& .MuiInputLabel-root': {
      position: 'relative',
    },
    '& .MuiInput-underline:before, & .MuiInput-underline:after': {
      display: 'none'
    },
    '& .MuiInputBase-input': {
      border: '0',
      clip: 'rect(1px, 1px, 1px, 1px)',
      clipPath: 'inset(50%)',
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      padding: '0',
      position: 'absolute',
      width: '1px',
      whiteSpace: 'nowrap',
    },
  },
}));

export interface CreatePostProps {
  uploadedMedias: MediaState['uploadedMedias'];
  createPost: typeof createPost.request;
  uploadMedia: typeof uploadMedia.request;
  clearUploadedMedias: typeof clearUploadedMedias;
  uploadingMedias: MediaState['loading'];
}

export const CreatePost: React.FC<CreatePostProps> = props => {
  const classes = useStyles();
  const { createPost, uploadMedia, uploadedMedias, clearUploadedMedias, uploadingMedias } = props;
  const [content, setContent] = useState('');
  const [privacy, setPrivacy] = useState('friends');
  const [files, setFiles] = useState<File[] | null>( null );

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(
      uploadingMedias &&
      !window.confirm('The post media weren\'t uploaded, are you sure to post without the medias?')
    ) return;
 
    createPost({ content, privacy, medias: uploadedMedias.map( m => m.url ) });
    clearUploadedMedias();
    setContent('')
    setFiles(null);
  }

  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Create post: </Typography>
            <TextField
              multiline
              fullWidth
              value={content}
              onChange={e => setContent(e.target.value)}
              rowsMax="15"
              rows="4"
              placeholder="How are you feeling today?"
            />
          </Grid>
          {!!uploadingMedias && (
            <Grid item xs={12}>
              Uploading...
            </Grid>
          )}
          <Grid item xs={12}>
            <label>
              <TextField
                className={classes.input}
                type="file"
                onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                  if( !e.target.files ) return;
                  const newFiles = [...(files || []), ...e.target.files];
                  setFiles( newFiles );
                  uploadMedia({ files: [...e.target.files] });
                }}
                inputProps={{
                  multiple: true,
                }}
                InputProps={{
                  startAdornment: (
                    <Tooltip title="Upload image">
                      <Button
                        color="secondary"
                        size="small"
                        component="span"
                        startIcon={<ImageIcon />}
                      >
                        Upload image
                      </Button>
                    </Tooltip>
                  ),
                }}
              />
            </label>
          </Grid>
          {!!uploadedMedias.length && (
            <Grid item xs={12}>
              <GridList cellHeight={160} cols={3}>
                {uploadedMedias.map( (image, i) => {
                  return (
                    <GridListTile key={i} cols={1}>
                      <img src={image.url} alt='Uploaded media' />
                    </GridListTile>
                  )
                })}
              </GridList>
            </Grid>
          )}
          <Grid item xs={12}>
            <Grid container justify="flex-end" alignItems="center" spacing={2}>
              <Grid item xs="auto">
                <InputLabel htmlFor="create-post-privacy-select">Visible to: </InputLabel>
              </Grid>
              <Grid item xs="auto">
                <FormControl>
                  <Select
                    id="create-post-privacy-select"
                    value={privacy}
                    onChange={e => typeof e.target.value === 'string' && setPrivacy(e.target.value)}
                    input={<InputBase />}
                  >
                    <MenuItem value="friends">
                      <ListItemIcon className={classes.selectIcon}><FriendsIcon fontSize="small" /></ListItemIcon>
                      <Typography variant="inherit">Friends</Typography>
                    </MenuItem>
                    <MenuItem value="public">
                      <ListItemIcon className={classes.selectIcon}><PublicIcon fontSize="small" /></ListItemIcon>
                      <Typography variant="inherit">Public</Typography>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs="auto">
                <Button type="submit" disabled={!content}>Publish</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default CreatePost;
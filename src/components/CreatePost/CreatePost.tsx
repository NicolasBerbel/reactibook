import React, { useState, useEffect, FormEvent } from 'react';
import { IPost, createPost, uploadMedia, MediaState, clearUploadedMedias } from '../../store';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ImageIcon from '@material-ui/icons/Image';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import PrivacySelect from '../PrivacySelect';

const useStyles = makeStyles( theme => ({
  root: {
    padding: theme.spacing(3)
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
  const [elevation, setElevation] = useState(2);
  const [content, setContent] = useState('');
  const [privacy, setPrivacy] = useState<IPost['privacy']>('friends');
  const [files, setFiles] = useState<File[] | null>( null );

  useEffect(() => {
    setElevation(!content ? 2 : 5 );
  }, [content])

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
    <Paper className={classes.root} elevation={elevation}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Create post: </Typography>
            <TextField
              multiline
              fullWidth
              value={content}
              onChange={e => setContent(e.target.value)}
              onBlur={() => !!content ? setElevation(5) : setElevation(2)}
              onFocus={() => setElevation(5)}
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
                <PrivacySelect privacy={privacy} onChange={privacy => setPrivacy(privacy)}/>
              </Grid>
              <Grid item xs="auto">
                <Button type="submit" disabled={!content || !!uploadingMedias}>Publish</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default CreatePost;
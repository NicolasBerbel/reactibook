import React from 'react';
import { IPost } from '../../store';
import { makeStyles } from '@material-ui/core/styles';
import FriendsIcon from '@material-ui/icons/Group';
import PublicIcon from '@material-ui/icons/Public';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles( theme => ({
  selectIcon: {
    marginRight: theme.spacing(1)
  },
}));

export interface PrivacySelectProps {
  privacy: IPost['privacy'];
  onChange: (privacy : IPost['privacy']) => void;
}

export const PrivacySelect : React.FC<PrivacySelectProps> = props => {
  const classes = useStyles();

  return (
    <FormControl>
      <Select
        id="create-post-privacy-select"
        value={props.privacy}
        onChange={e => {
          const privacy = e.target.value;
          if( privacy === 'friends' || privacy === 'public') {
            props.onChange(privacy)
          }
        }}
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
  )
};

export default PrivacySelect;
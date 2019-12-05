import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { red } from '@material-ui/core/colors';

export interface PostActionsProps {
  onDelete: Function;
  onEdit: Function;
}

const PostActions : React.FC<PostActionsProps> = props => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-controls="post-actions" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="post-actions"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <MenuItem onClick={e => {
          handleClose();
          props.onEdit();
        }}>
          <EditIcon style={{marginRight: 8}} />
          Edit
        </MenuItem>
        <MenuItem
          style={{color: red[600]}}
          onClick={e => {
            handleClose();
            props.onDelete();
          }}
        >
          <DeleteIcon style={{marginRight: 8}} />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}

export default PostActions;

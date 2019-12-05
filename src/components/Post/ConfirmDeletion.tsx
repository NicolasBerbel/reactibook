import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

export interface ConfirmDeletionProps {
  open: boolean;
  onClose: Function;
  onConfirm: Function;
}

const DangerButton = withStyles(theme => ({
  root: {
    color: '#fff',
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);


const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ConfirmDeletion : React.FC<ConfirmDeletionProps> = props => {
  return (
    <div>
      <Dialog
        fullWidth
        TransitionComponent={Transition}
        maxWidth="lg"
        open={props.open}
        onClose={() => props.onClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm post deletion?</DialogTitle>
        <DialogContent>
          <Paper elevation={0} square style={{backgroundColor: '#f5f5f5', padding: 16}}>
            <DialogContentText id="alert-dialog-description">
              {props.children}
            </DialogContentText>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.onClose()} color="primary">
            Cancel
          </Button>
          <DangerButton onClick={() => props.onConfirm()} color="primary" autoFocus>
            Confirm deletion
          </DangerButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmDeletion;
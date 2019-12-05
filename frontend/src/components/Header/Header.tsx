import React from 'react';
import { AuthState } from '../../store';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles( theme => ({
  toolbar: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main
  }
}));

export interface HeaderProps {
  user: AuthState['user'];
  logout: Function;
}

export const Header : React.FC<HeaderProps> = props => {
  const { user } = props;
  const classes = useStyles();

  return (
    <AppBar color="primary" elevation={2}>
      <Toolbar className={classes.toolbar}>
        <Container>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs='auto'>
              <Typography variant="h5">Reactibook</Typography>
            </Grid>
            {!!user && (
              <Grid item xs='auto'>
                <Grid container alignItems="center">
                  <Grid item>
                    <Tooltip title={user.username}>
                      <Avatar
                        variant="rounded"
                        className={classes.avatar}
                        src={user.avatar}
                      >
                        {!user.avatar && user.username.slice(0, 1).toUpperCase()}
                      </Avatar>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title="Logout" aria-label="Logout">
                      <IconButton color="inherit" onClick={() => props.logout()}>
                        <ExitToAppIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default Header;

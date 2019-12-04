import React from 'react';
import Header from '../Header/HeaderContainer';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  toolbar: {
    width: '100%',
    marginBottom: theme.spacing(3),
    ...(theme.overrides && theme.overrides.MuiToolbar && theme.overrides.MuiToolbar.regular),
  },
}));

export const Layout : React.FC = props => {
  const classes = useStyles();
  
  return (
    <div>
      <Header />
      <div className={classes.toolbar} />
      <Container component="main" maxWidth="sm">
        { props.children }
      </Container>
    </div>
  )
}

export default Layout;

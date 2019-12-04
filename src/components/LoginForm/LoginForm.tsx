import React, { useState, useEffect, FormEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

export interface LoginFormProps {
  login: Function;
  loading: boolean;
  usernameError: string | null;
  passwordError: string | null;
}

const useStyles = makeStyles(theme => ({
  '@keyframes autofill': {
    to: {
      color: 'inherit',
      background: 'transparent'
    }
  },
  fieldControl: {
    '& input:-webkit-autofill': {
      animationName: '$autofill',
      animationFillMode: 'both',
      animationDuration: 'initial',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
  },
}));

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const classes = useStyles();
  const { loading, login } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(props.usernameError);
  const [passwordError, setPasswordError] = useState(props.passwordError);

  useEffect(() => { setUsernameError(props.usernameError) }, [props.usernameError])
  useEffect(() => { setPasswordError(props.passwordError) }, [props.passwordError])

  const clearErrors = () => {
    setUsernameError('');
    setPasswordError('');
  }

  const handleLoginSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //@ts-ignore
    if( !e.target.checkValidity() ) return;

    clearErrors();
    login({ username, password });
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography align="center" variant="h5">
              Welcome to <Typography variant="h5" component="strong" color="secondary">Reactibook</Typography>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" variant="subtitle2" paragraph>Please, login to continue.</Typography>
          </Grid>
        </Grid>
        {loading && (
          <div>
            Loading...
          </div>
        )}
        {!loading && (
          <form onSubmit={handleLoginSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.fieldControl} error={!!usernameError}>
                  <InputLabel error={!!usernameError}>Email</InputLabel>
                  <Input
                    type="email"
                    value={username}
                    required
                    onChange={e => setUsername(e.target.value)}
                    autoComplete="username"
                    //@ts-ignore
                    onInvalid={ e => setUsernameError(e.target.validationMessage)}
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    }
                  />
                  {usernameError && <FormHelperText error>{usernameError}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.fieldControl} error={!!passwordError}>
                  <InputLabel error={!!passwordError}>Password</InputLabel>
                  <Input
                    type="password"
                    value={password}
                    required
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                    //@ts-ignore
                    onInvalid={ e => setPasswordError(e.target.validationMessage)}
                    startAdornment={
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    }
                  />
                  {passwordError && <FormHelperText error>{passwordError}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  disabled={!username || !password}
                >Login</Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Paper>
    </Container>
  );
}

export default LoginForm;

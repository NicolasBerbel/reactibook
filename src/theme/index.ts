import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#E91E63',
    },
    secondary: {
      main: '#00BCD4',
    },
  },
  props: {
    MuiInputLabel: {
    },
    MuiButton: {
      variant: 'contained',
      color: 'primary'
    },
    MuiFormControl: {
      color: 'secondary'
    },
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiIcon: {
      fontSize: 'inherit'
    },
    MuiListItemText: {
      primaryTypographyProps: {
        variant: 'body1'
      }
    }
  },
});
theme.overrides = theme.overrides || {};
theme.overrides.MuiToolbar = {
  gutters: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  regular: {
    minHeight: 64,
    [theme.breakpoints.up('md')]: {
      minHeight: 80,
    },
    [theme.breakpoints.up('lg')]: {
      minHeight: 100,
    },
    [theme.breakpoints.up('xl')]: {
      minHeight: 118,
    }
  },
}

export default theme;

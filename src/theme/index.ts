import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00BCD4',
      contrastText: '#fff'
    },
    secondary: {
      main: '#E91E63',
    },
  },
  props: {
    MuiInputLabel: {},
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
      fontSize: 'small'
    },
    MuiListItemText: {
      primaryTypographyProps: {
        variant: 'body1'
      }
    }
  },
});
theme.overrides = theme.overrides || {};

theme.overrides.MuiInputBase = {
  input: {
    paddingLeft: theme.spacing(1)
  }
};

theme.overrides.MuiListItemIcon = {
  root: {
    minWidth: 'initial',
  }
};

theme.overrides.MuiSelect = {
  root: {
    display: 'inline-flex',
  }
};

theme.overrides.MuiToolbar = {
  gutters: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  regular: {
    minHeight: 40,
    [theme.breakpoints.up('sm')]: {
      minHeight: 40,
    },
    [theme.breakpoints.up('md')]: {
      minHeight: 60,
    },
    [theme.breakpoints.up('lg')]: {
      minHeight: 60,
    },
    [theme.breakpoints.up('xl')]: {
      minHeight: 60,
    }
  },
}

export default theme;

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

export default theme;


import React from 'react';
import { ThemeProvider, StylesProvider, createGenerateClassName } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../../theme';

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
});

export const AppTheme : React.FC = props => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        { props.children }
      </ThemeProvider>
    </StylesProvider>
  );
}

export default AppTheme;

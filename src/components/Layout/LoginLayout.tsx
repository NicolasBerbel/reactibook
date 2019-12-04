import React from 'react';
import Container from '@material-ui/core/Container';

export const LoginLayout : React.FC = props => {
  return (
    <Container component="main" maxWidth="xs">
      { props.children }
    </Container>
  )
}

export default LoginLayout;

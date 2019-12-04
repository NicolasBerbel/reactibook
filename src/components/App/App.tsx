import React from 'react';
import LoginForm from '../LoginForm/LoginFormContainer';
import { IToken } from '../../store';
import Timeline from '../Timeline/TimelineContainer';
import AppTheme from './AppTheme';

export interface AppProps {
  token: IToken | null;
  logout: Function;
}

export const App: React.FC<AppProps> = props => {
  return (
    <AppTheme>
      {props.token && (
        <>
          <button onClick={() => props.logout()}>Logout</button>
          <h1>Hello {props.token.username}!</h1>
          <Timeline />
        </>
      )}
      {!props.token && (
        <LoginForm />
      )}
    </AppTheme>
  );
}

export default App;

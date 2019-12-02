import React from 'react';
import LoginForm from '../LoginForm/LoginFormContainer';
import { IToken } from '../../store';
import Timeline from '../Timeline/TimelineContainer';

export interface AppProps {
  token: IToken | null;
  logout: Function;
}

export const App: React.FC<AppProps> = props => {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;

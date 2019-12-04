import React from 'react';
import { Layout, LoginLayout } from '../Layout';
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
          <Layout>
            <Timeline />
          </Layout>
        )}
        {!props.token && (
          <LoginLayout>
            <LoginForm />
          </LoginLayout>
        )}
    </AppTheme>
  );
}

export default App;

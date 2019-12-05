import React, { useEffect } from 'react';
import { Layout, LoginLayout } from '../Layout';
import LoginForm from '../LoginForm/LoginFormContainer';
import { AuthState } from '../../store';
import Timeline from '../Timeline/TimelineContainer';
import AppTheme from './AppTheme';

export interface AppProps {
  token: AuthState['token'];
  user: AuthState['user'];
  getAuthUser: Function;
  logout: Function;
}

export const App: React.FC<AppProps> = props => {
  const {user, token, getAuthUser} = props; 

  useEffect(() => {
    if( !!token && !user ) {
      getAuthUser();
    }
  }, [token, user, getAuthUser])

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

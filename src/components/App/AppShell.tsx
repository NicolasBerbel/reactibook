import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from '../../store';

export const AppShell : React.FC = props => {
  
  return (
    <>
    <Provider store={store}>
      <App></App>
    </Provider>
    </>
  )
}

export default AppShell;
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { config as configEnv } from 'dotenv';
configEnv({ path: `./environments/${process.env.NODE_ENV || 'development'}/.env`});

ReactDOM.render(<App />, document.getElementById('root'));


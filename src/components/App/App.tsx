import React, { useState, useEffect, FormEvent } from 'react';
import Timeline from '../Timeline/TimelineContainer';
import api from '../../services/api';

export const App: React.FC = () => {
  const [token, setToken] = useState( localStorage.getItem('token') );
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState();

  useEffect(() => {
    if( token ) {
      const { username, id, exp  } = JSON.parse(atob(token.split('.')[1]));
      if( exp * 1000 < new Date().getTime() ) {
        setToken(null);
        setUser(null);
        return;
      }
      localStorage.setItem('token', token);
      setUser({
        username,
        id
      });
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token])

  const clearErrors = () => {
    setUsernameError('');
    setPasswordError('');
  }

  const handleLoginSubmit = async (e : FormEvent) => {
    e.preventDefault();

    //@ts-ignore
    if( !e.target.checkValidity() ) return;

    try {
      setLoading(true)
      clearErrors();
      const { data : { access_token : token } } = await api.post('/auth/login', { username, password});
      setToken(token);
      
    } catch (e) {
      if( e.response.status === 404 ) {
        setUsernameError( e.response.data.message );
      }
      
      if( e.response.status === 401 ) {
        setPasswordError( e.response.data.message );
      }
    }

    setLoading(false)
  }
  
  return (
    <div className="App">
      {loading && (
        <div>
          Carregando...
        </div>
      )}
      {!loading && (
        <>
          {user && (
            <>
            <button onClick={() => setToken(null)}>Logout</button>
            <h1>Hello {user.username}!</h1>
            <Timeline />
            </>
          )}
          {!user && (
            <form onSubmit={handleLoginSubmit} autoComplete="off" noValidate>
              <div>
                <input
                  type="email"
                  value={username}
                  required
                  onChange={e => setUsername(e.target.value)}
                  //@ts-ignore
                  onInvalid={ e => setUsernameError(e.target.validationMessage)}
                />
                {usernameError && (
                  <div>{usernameError}</div>
                )}
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  required
                  onChange={e => setPassword(e.target.value)}
                  //@ts-ignore
                  onInvalid={ e => setPasswordError(e.target.validationMessage)}
                />
                {passwordError && (
                  <div>{passwordError}</div>
                )}
              </div>
              <button
                type="submit"
                disabled={!username || !password}
              >Submit</button>
            </form>
          )}
        </>
      )}
    </div>
  );
}

export default App;

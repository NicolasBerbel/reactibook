import React, { useState, useEffect, FormEvent } from 'react';
import api from '../../services/api.service';

const App: React.FC = () => {
  const [token, setToken] = useState( localStorage.getItem('token') );
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState();

  useEffect(
    () => {
      if( token ) {
        localStorage.setItem('token', token);
        const payload = token.split('.')[1];
        const { username, id } = JSON.parse(atob(payload));
        setUser({
          username,
          id
        });
      } else {
        localStorage.removeItem('token')
      }

      return () => {}
    },
    [token],
  )

  const clearErrors = () => {
    setUsernameError('');
    setPasswordError('');
  }

  const handleSubmit = async (e : FormEvent) => {
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
            <h1>Hello {user.username}!</h1>
          )}
          {!user && (
            <form onSubmit={handleSubmit} autoComplete="off" noValidate>
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

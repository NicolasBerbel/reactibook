import React, { useState, useEffect, FormEvent } from 'react';

export interface LoginFormProps {
  login: Function;
  loading: boolean;
  usernameError: string | null;
  passwordError: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { loading, login } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(props.usernameError);
  const [passwordError, setPasswordError] = useState(props.passwordError);

  useEffect(() => { setUsernameError(props.usernameError) }, [props.usernameError])
  useEffect(() => { setPasswordError(props.passwordError) }, [props.passwordError])

  const clearErrors = () => {
    setUsernameError('');
    setPasswordError('');
  }

  const handleLoginSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //@ts-ignore
    if( !e.target.checkValidity() ) return;

    clearErrors();
    login({ username, password });
  }
  
  return (
    <div>
      {loading && (
        <div>
          Carregando...
        </div>
      )}
      {!loading && (
        <form onSubmit={handleLoginSubmit} autoComplete="off" noValidate>
          <div>
            <input
              type="email"
              value={username}
              required
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
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
              autoComplete="current-password"
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
    </div>
  );
}

export default LoginForm;

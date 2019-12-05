import { IToken } from './types';

export const parseToken = (raw : string | null) : IToken | null => {
  if( !raw ) return null;

  let parsedToken;
  try {
    parsedToken = JSON.parse(atob(raw.split('.')[1]));
  } catch (error) {return null}

  return {
    raw,
    ...parsedToken
  }
}

export const validateToken = () : IToken | null => {
  const token = parseToken(localStorage.getItem('token'));
  if( !token || token.exp * 1000 < new Date().getTime()) return null;
  return token;
}
import { IToken, IUser } from './types';

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

export const validateUser = () : IUser | null => {
  const token = validateToken();
  if( !token ) return null;

  try {
    const storageUser = localStorage.getItem('user');
    if( !storageUser ) return null;

    const user : IUser = JSON.parse( storageUser );
    if( !user ) return null;

    return user;
  } catch (e) { return null; }

}

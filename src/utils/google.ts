import * as queryString from 'query-string';

const stringifiedParams = queryString.default.stringify({
  client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  redirect_uri: 'http://localhost:3000/authenticate/google',
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' '),
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
});

export const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;


import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  secret: process.env.SESSION_COOKIE_SECRET,
  issuerBaseURL: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  clientID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  routes: {
    callback: process.env.NEXT_PUBLIC_REDIRECT_URI || '/api/auth/callback',
    postLogoutRedirect: process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI || '/',
  },
  authorizationParams: {
    response_type: 'code',
    scope: process.env.NEXT_PUBLIC_AUTH0_SCOPE,
  },
  session: {
    // @ts-ignore this is ok
    absoluteDuration: process.env.SESSION_COOKIE_LIFETIME,
  },
});

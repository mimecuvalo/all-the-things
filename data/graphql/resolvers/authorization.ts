import authorization from 'app/authorization';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { currentUser }) =>
  authorization.isAuthenticated(currentUser) ? skip : new Error('Not logged in.');

export const isAdmin = (parent, args, { currentUser }) =>
  authorization.isAuthenticated(currentUser)
    ? authorization.isAdmin(currentUser)
      ? skip
      : new ForbiddenError('I call shenanigans.')
    : new Error('Not logged in.');

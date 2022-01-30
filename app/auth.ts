import configuration from './configuration';

// Wrapper function to saveLogin/removeLogin that sets the user object appropriately.
export function setUser(userObjOrUndefined) {
  if (!userObjOrUndefined) {
    removeLogin();
  } else {
    // Currently, we save the user only on server-side. If you want to use localStorage tokens http
    // only and don't need server-side rendering then you can implement logic here.
  }
}

// Internal function to this file to remove the user information.
async function removeLogin() {
  await fetch('/api/auth/logout', {
    method: 'POST',
    body: JSON.stringify({
      next: window.location.href,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  window.location.reload();
}

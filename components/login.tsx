import { Button } from '@mui/material';
import { FormattedMessage } from 'i18n';
import UserContext from 'app/UserContext';
import { useContext } from 'react';

export default function LoginLogoutButton() {
  const user = useContext(UserContext).user;

  return (
    <span>
      <Button variant="contained" color="primary" href={user ? '/api/auth/logout' : '/api/auth/login'}>
        {user ? <FormattedMessage defaultMessage="Logout" /> : <FormattedMessage defaultMessage="Login" />}
      </Button>
    </span>
  );
}

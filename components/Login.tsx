import { Button } from '@mui/material';
import { F } from 'i18n';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function LoginLogoutButton() {
  const { data: session } = useSession();

  const handleClick = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };

  return (
    <span>
      <Button variant="contained" color="primary" onClick={handleClick}>
        {session ? <F defaultMessage="Logout" /> : <F defaultMessage="Login" />}
      </Button>
    </span>
  );
}

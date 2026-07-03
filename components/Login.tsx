import { F } from 'i18n';
import { signIn, signOut, useSession } from 'lib/auth-client';

export default function LoginLogoutButton() {
  const { session } = useSession();

  const handleClick = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };

  return (
    <span>
      <button type="button" className="btn" onClick={handleClick}>
        {session ? <F defaultMessage="Logout" /> : <F defaultMessage="Login" />}
      </button>
    </span>
  );
}

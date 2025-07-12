import { Link, Typography } from 'components';
import { F } from 'i18n';
import AuthWrapper from './auth-wrapper';

export default async function AdminPage() {
  return (
    <AuthWrapper>
      <div style={{ padding: '20px' }}>
        <Typography variant="h1">
          <F defaultMessage="Admin" />
        </Typography>
        <ul>
          <li>
            <Link href="/admin/exceptions">
              <F defaultMessage="Exceptions" />
            </Link>
          </li>
          <li>
            <Link href="/admin/experiments">
              <F defaultMessage="Experiments" />
            </Link>
          </li>
          <li>
            <Link href="/admin/repl">
              <F defaultMessage="REPL" />
            </Link>
          </li>
          <li>
            <Link href="/admin/system-info">
              <F defaultMessage="System Info" />
            </Link>
          </li>
        </ul>
      </div>
    </AuthWrapper>
  );
}

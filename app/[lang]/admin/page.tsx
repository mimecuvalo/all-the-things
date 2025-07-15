import Admin from './admin';
import AuthWrapper from './auth-wrapper';

export const dynamic = 'force-dynamic';
export default function AdminPage() {
  return (
    <AuthWrapper>
      <Admin />
    </AuthWrapper>
  );
}

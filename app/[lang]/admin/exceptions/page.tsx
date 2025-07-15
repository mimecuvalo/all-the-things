import { ExceptionsClient } from './exceptions';
import AuthWrapper from '../auth-wrapper';

export const dynamic = 'force-dynamic';
export default async function ExceptionsPage() {
  return (
    <AuthWrapper>
      <ExceptionsClient />
    </AuthWrapper>
  );
}

import { ExceptionsClient } from './exceptions';
import AuthWrapper from '../auth-wrapper';

export default async function ExceptionsPage() {
  return (
    <AuthWrapper>
      <ExceptionsClient />
    </AuthWrapper>
  );
}

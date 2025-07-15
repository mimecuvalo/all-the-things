import { ReplClient } from './repl';
import AuthWrapper from '../auth-wrapper';

export const dynamic = 'force-dynamic';
export default async function ReplPage() {
  return (
    <AuthWrapper>
      <ReplClient />
    </AuthWrapper>
  );
}

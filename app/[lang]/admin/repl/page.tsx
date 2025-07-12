import { ReplClient } from './repl';
import AuthWrapper from '../auth-wrapper';

export default async function ReplPage() {
  return (
    <AuthWrapper>
      <ReplClient />
    </AuthWrapper>
  );
}

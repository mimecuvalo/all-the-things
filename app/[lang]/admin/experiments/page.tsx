import { ExperimentsClient } from './experiments';
import AuthWrapper from '../auth-wrapper';

export const dynamic = 'force-dynamic';
export default async function ExperimentsPage() {
  return (
    <AuthWrapper>
      <ExperimentsClient />
    </AuthWrapper>
  );
}

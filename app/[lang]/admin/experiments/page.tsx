import { ExperimentsClient } from './experiments';
import AuthWrapper from '../auth-wrapper';

export default async function ExperimentsPage() {
  return (
    <AuthWrapper>
      <ExperimentsClient />
    </AuthWrapper>
  );
}

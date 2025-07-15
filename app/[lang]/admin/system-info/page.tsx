import { SystemInfoClient } from './system-info';
import AuthWrapper from '../auth-wrapper';

export const dynamic = 'force-dynamic';
export default async function SystemInfoPage() {
  return (
    <AuthWrapper>
      <SystemInfoClient />
    </AuthWrapper>
  );
}

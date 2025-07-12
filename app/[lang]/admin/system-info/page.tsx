import { SystemInfoClient } from './system-info';
import AuthWrapper from '../auth-wrapper';

export default async function SystemInfoPage() {
  return (
    <AuthWrapper>
      <SystemInfoClient />
    </AuthWrapper>
  );
}

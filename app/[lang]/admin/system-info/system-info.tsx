'use client';

import { Typography } from 'components';
import { F } from 'i18n';

export function SystemInfoClient() {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h1">
        <F defaultMessage="System Info" />
      </Typography>
      <pre>
        NODE_ENV: {process.env.NODE_ENV}
        <br />
        <F defaultMessage="TODOS:" />
        <br />
        - CPU/Memory info
        <br />
        - other useful info...
        <br />
      </pre>
    </div>
  );
}

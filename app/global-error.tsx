'use client';

import * as Sentry from '@sentry/nextjs';
import { NextPage } from 'next';
import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError: NextPage<GlobalErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <h2>Something went wrong!</h2>
          <p>We&apos;ve logged this error and will fix it soon.</p>
          <button
            onClick={() => reset()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;

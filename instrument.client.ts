import * as Sentry from '@sentry/tanstackstart-react';
import { logError } from 'lib/error';

const dsn = import.meta.env.VITE_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 1.0,
    enableLogs: true,
  });
}

let reportedGlobalError = false;
function reportGlobalError(error: unknown) {
  if (reportedGlobalError) return;
  reportedGlobalError = true;
  const value = error instanceof Error ? { message: error.message, stack: error.stack } : { message: String(error) };
  logError({ ...value, url: window.location.href, userAgent: navigator.userAgent });
}

window.addEventListener('error', (event) => reportGlobalError(event.error || event.message));
window.addEventListener('unhandledrejection', (event) => reportGlobalError(event.reason));

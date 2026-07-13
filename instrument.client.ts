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

const reportedGlobalErrors = new WeakSet<object>();

function reportGlobalError(error: unknown) {
  if (error instanceof Error && error.message === 'Transition was skipped') return;
  if (typeof error === 'object' && error !== null) {
    if (reportedGlobalErrors.has(error)) return;
    reportedGlobalErrors.add(error);
  }
  const value = error instanceof Error ? { message: error.message, stack: error.stack } : { message: String(error) };
  logError({ ...value, url: window.location.href, userAgent: navigator.userAgent });
}

window.addEventListener('error', (event) => reportGlobalError(event.error || event.message));
window.addEventListener('unhandledrejection', (event) => reportGlobalError(event.reason));

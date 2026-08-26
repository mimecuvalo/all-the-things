import type { ReactNode } from 'react';
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';
import 'sanitize.css/sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import '@fontsource-variable/oswald';
import 'styles/globals.css';
import { Header } from 'components';
import AppProviders from 'components/providers/AppProviders';
import DebugWrapper from 'components/internal/DebugWrapper';
import NotFound from 'components/pages/NotFound';
import ErrorScreen from 'components/pages/ErrorScreen';
import { getMessages } from 'lib/messages';
import { initRequest } from 'lib/request-init';

export const Route = createRootRoute({
  loader: async () => {
    const { locale } = await initRequest();
    return { locale, messages: getMessages(locale) };
  },
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'minimum-scale=1, initial-scale=1, width=device-width' },
      { title: 'all-the-things' },
      { name: 'description', content: 'website created using all-the-things.' },
      { name: 'generator', content: 'all-the-things. https://github.com/mimecuvalo/all-the-things' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.jpg', sizes: '32x32' },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', href: '/favicon.jpg' },
      { rel: 'manifest', href: '/manifest.json' },
      {
        rel: 'search',
        href: '/api/opensearch',
        type: 'application/opensearchdescription+xml',
        title: 'all-the-things',
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorScreen,
});

function RootComponent() {
  const { locale, messages } = Route.useLoaderData();
  return (
    <RootDocument locale={locale}>
      <AppProviders locale={locale} messages={messages}>
        <Header />
        <Outlet />
        <DebugWrapper />
      </AppProviders>
    </RootDocument>
  );
}

function RootDocument({ locale, children }: { locale: string; children: ReactNode }) {
  return (
    <html lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

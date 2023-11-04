import 'styles/globals.css';

import * as serviceWorkerRegistration from 'app/serviceWorkerRegistration';

import { APOLLO_STATE_PROP_NAME, useApollo } from 'app/apollo';
import { ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { DebugWrapper, Header } from 'components';
import { IntlProvider, setupCreateIntl } from 'i18n';
import { createEmotionCache, muiTheme } from 'styles';
import { disposeAnalytics, setupAnalytics } from 'app/analytics';

import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import ErrorBoundary from 'components/error/ErrorBoundary';
import { F } from 'i18n';
import Head from 'next/head';
import { Inter, Oswald } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import classNames from 'classnames';
import clientHealthCheck from 'app/clientHealthCheck';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { trackWebVitals } from 'app/reportWebVitals';
import { useReportWebVitals } from 'next/web-vitals';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// If loading a variable font, you don't need to specify the font weight
const oswald = Oswald({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface CustomAppProps extends AppProps {
  [APOLLO_STATE_PROP_NAME]: NormalizedCacheObject;
  emotionCache: EmotionCache;
  nonce: string;
}

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: CustomAppProps) {
  const { locale = 'en', defaultLocale = 'en' } = useRouter();
  const apolloClient = useApollo(pageProps);
  useReportWebVitals(trackWebVitals);

  useEffect(() => {
    // Upon starting the app, kick off a client health check which runs periodically.
    clientHealthCheck();

    setupAnalytics();

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://cra.link/PWA
    serviceWorkerRegistration.unregister();

    // TODO(mime)
    // window.configuration = {
    //   experiments: getExperiments(user),
    // };
    // initializeLocalState(window.configuration.experiments);

    return () => {
      disposeAnalytics();
    };
  });

  const messages = pageProps.intlMessages || {};
  // createIntl is used in non-React locations.
  setupCreateIntl({ defaultLocale, locale, messages });

  return (
    // @ts-ignore looks like IntlProvider still needs updated types after React 18 transition.
    <IntlProvider defaultLocale={locale} locale={locale} messages={messages}>
      <ApolloProvider client={apolloClient}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={muiTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <UserProvider>
              <ErrorBoundary>
                <div
                  className={classNames({
                    'App-logged-in': true,
                    'App-is-development': process.env.NODE_ENV === 'development',
                    [oswald.variable]: true,
                    [inter.variable]: true,
                  })}
                >
                  <Header />
                  <Head>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                  </Head>
                  <Component {...pageProps} />
                  <Analytics />
                  <DebugWrapper />
                </div>
              </ErrorBoundary>
            </UserProvider>

            <noscript>
              <F defaultMessage="You need to enable JavaScript to run this app." />
            </noscript>
          </ThemeProvider>
        </CacheProvider>
      </ApolloProvider>
    </IntlProvider>
  );
}

export default MyApp;

import 'styles/globals.css';

import * as serviceWorkerRegistration from 'app/serviceWorkerRegistration';

import { ApolloProvider, NormalizedCacheObject, gql } from '@apollo/client';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { Footer, Header } from 'components';
import { IntlProvider, setupCreateIntl } from 'i18n';
import { createEmotionCache, muiTheme } from 'styles';
import { reportWebVitals, trackWebVitals } from 'app/reportWebVitals';
import { useEffect, useState } from 'react';

import type { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import ErrorBoundary from 'components/error/ErrorBoundary';
import { F } from 'i18n';
import { ThemeProvider } from '@mui/material/styles';
import UserContext from 'app/UserContext';
import classNames from 'classnames';
import clientHealthCheck from 'app/clientHealthCheck';
import getExperiments from 'app/experiments';
import { initializeLocalState } from 'data/localState';
import { setupAnalytics } from 'app/analytics';
import { useApollo } from 'app/apollo';
import { useFetchUser } from 'vendor/auth0/user';
import { useRouter } from 'next/router';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const UPDATE_USER = gql`
  mutation UpdateUser($user: User!) {
    updateUser(user: $user) {
      email
    }
  }
`;

export interface CustomAppProps extends AppProps {
  __APOLLO_STATE__: NormalizedCacheObject;
  emotionCache: EmotionCache;
}

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: CustomAppProps) {
  const { user } = useFetchUser();
  const [userContext, setUserContext] = useState({ user });
  const { locale = 'en', defaultLocale = 'en' } = useRouter();
  const apolloClient = useApollo(pageProps);

  useEffect(() => {
    // Upon starting the app, kick off a client health check which runs periodically.
    clientHealthCheck();

    reportWebVitals(trackWebVitals);

    setupAnalytics();

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://cra.link/PWA
    serviceWorkerRegistration.unregister();

    window.configuration = {
      user,
      experiments: getExperiments(user),
    };
    initializeLocalState(user, window.configuration.experiments);
  });

  useEffect(() => {
    setUserContext({ user });
  }, [user]);

  const messages = pageProps.intlMessages || {};
  // createIntl is used in non-React locations.
  setupCreateIntl({ defaultLocale, locale, messages });

  return (
    <IntlProvider defaultLocale={locale} locale={locale} messages={messages}>
      <ApolloProvider client={apolloClient}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={muiTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <UserContext.Provider value={userContext}>
              <ErrorBoundary>
                <div
                  className={classNames({
                    'App-logged-in': true,
                    'App-is-development': process.env.NODE_ENV === 'development',
                  })}
                >
                  <Header />
                  <Component {...pageProps} />
                  <Footer />
                </div>
              </ErrorBoundary>
            </UserContext.Provider>

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

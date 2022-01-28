import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache, muiTheme } from 'styles';
import { reportWebVitals, trackWebVitals } from 'app/reportWebVitals';
import { useEffect, useState } from 'react';
import * as serviceWorkerRegistration from 'app/serviceWorkerRegistration';
import { IntlProvider, isInternalLocale, setLocales, setupCreateIntl } from 'i18n';
import { ApolloProvider } from '@apollo/client';
import configuration from 'app/configuration';
import createApolloClient from 'app/apollo';
import { F } from 'i18n';
import UserContext from 'app/User_Context';
import clientHealthCheck from 'app/client_health_check';
import ErrorBoundary from 'components/error/ErrorBoundary';
import {setupAnalytics} from 'app/analytics';
import classNames from 'classnames';
import { Header, Footer } from 'components';
import {useFetchUser} from 'vendor/auth0/user'

setLocales({
  defaultLocale: configuration.defaultLocale,
  locales: configuration.locales,
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: AppProps) {
  const { user, loading } = useFetchUser();
  const [userContext, setUserContext] = useState({ user });

  useEffect(() => {
    // Upon starting the app, kick off a client health check which runs periodically.
    clientHealthCheck();

    reportWebVitals(trackWebVitals);

    setupAnalytics();

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://cra.link/PWA
    serviceWorkerRegistration.unregister();
  });

  useEffect(() => {
    setUserContext({user})
  }, [user])

  const client = createApolloClient();

  let messages = {};
  // This is to dynamically load language packs as needed. We don't need them all client-side.
  const { locale, defaultLocale } = configuration;
  // XXX re-enable later
  // if (locale !== defaultLocale && !isInternalLocale(locale)) {
  //   messages = (await import(`i18n/${locale}.json`)).default;
  // }

  // createIntl is used in non-React locations.
  setupCreateIntl({ defaultLocale, locale, messages });

  return (
    <IntlProvider defaultLocale={locale} locale={locale} messages={messages}>
      <ApolloProvider client={client}>
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
  )
}

export default MyApp

import React, { FC, ReactElement } from 'react';
import { RenderOptions, render } from '@testing-library/react';

import { ApolloProvider } from '@apollo/client';
import { IntlProvider } from 'i18n';
import { ThemeProvider } from '@mui/material/styles';
import createApolloClient from 'app/apollo';
import { muiTheme } from 'styles';

const AllTheProviders: FC = ({ children }) => {
  const client = createApolloClient();

  return (
    <ThemeProvider theme={muiTheme}>
      <ApolloProvider client={client}>
        <IntlProvider defaultLocale="en" locale="en" messages={{}}>
          {children}
        </IntlProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

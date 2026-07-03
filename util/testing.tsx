import { type FC, type PropsWithChildren, type ReactElement } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { type RenderOptions, render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { IntlProvider } from 'i18n';
import { makeQueryClient } from 'lib/query';

const AllTheProviders: FC<PropsWithChildren> = ({ children }) => (
  <IntlProvider defaultLocale="en" locale="en" messages={{}}>
    <QueryClientProvider client={makeQueryClient()}>{children}</QueryClientProvider>
  </IntlProvider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { screen };
export { customRender as render };

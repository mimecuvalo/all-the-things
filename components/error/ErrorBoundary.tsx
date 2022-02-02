import * as Sentry from '@sentry/react';

import { FormattedMessage } from 'i18n';
import { styled } from '@mui/material/styles';

const H1 = styled('h1')`
  border: 3px double #f00;
  borderradius: 3px;
  display: flex;
  alignitems: center;
  justifycontent: center;
  margin: 10px;
  fontweight: 400;
  color: #f00;
`;

// See React's documentation: https://reactjs.org/docs/error-boundaries.html
export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <Sentry.ErrorBoundary
      fallback={
        <H1>
          <FormattedMessage defaultMessage="Something went wrong. 😦" />
        </H1>
      }
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}

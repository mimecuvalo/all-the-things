import { F } from 'i18n';
import {styled} from '@mui/material/styles';
import * as Sentry from '@sentry/react';

const H1 = styled('h1')`
  border: 3px double #f00;
  borderRadius: 3px;
  display: flex;
  alignItems: center;
  justifyContent: center;
  margin: 10px;
  fontWeight: 400;
  color: #f00;
`

// See React's documentation: https://reactjs.org/docs/error-boundaries.html
export default function ErrorBoundary({children}) {
  return (
    <Sentry.ErrorBoundary fallback={
      <H1>
        <F defaultMessage="Something went wrong. 😦" />
      </H1>
    }>
      {children}
    </Sentry.ErrorBoundary>
  )
}
